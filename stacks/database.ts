/// <reference types="sst" />

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

type NetworkReturn = ReturnType<typeof import("./network").Network>;

export function Database(props: { network: NetworkReturn }) {
	const isProd = $app.stage === "prod";
	const net = props.network;

	const dbSg = new aws.ec2.SecurityGroup("db-sg", {
		vpcId: net.vpcId,
		description: "Aurora Postgres public access (restricted by IP)",
		tags: { Name: `${$app.name}-${$app.stage}-db-sg` },
	});

	new aws.vpc.SecurityGroupIngressRule("db-5432-ingress", {
		securityGroupId: dbSg.id,
		ipProtocol: "tcp",
		fromPort: 5432,
		toPort: 5432,
		cidrIpv4: "0.0.0.0/0",
		description: "Postgres public access (open to all)",
	});

	new aws.vpc.SecurityGroupEgressRule("db-egress-all", {
		securityGroupId: dbSg.id,
		ipProtocol: "-1",
		cidrIpv4: "0.0.0.0/0",
		description: "Allow all outbound",
	});

	const subnetGroup = new aws.rds.SubnetGroup("db-subnet-group", {
		subnetIds: net.publicSubnetIds,
		tags: { Name: `${$app.name}-${$app.stage}-db-subnet-group` },
	});

	const dbUser = "appuser";
	const pwd = new random.RandomPassword("db-password", {
		length: 20,
		overrideSpecial: "_-",
	});

	const secret = new aws.secretsmanager.Secret("db-secret", {
		name: `${$app.name}/${$app.stage}/db`,
		description: "Aurora database credentials",
	});

	const secretVersion = new aws.secretsmanager.SecretVersion("db-secret-v1", {
		secretId: secret.id,
		secretString: pwd.result.apply((password) =>
			JSON.stringify({ username: dbUser, password }),
		),
	});

	const pg = new aws.rds.ClusterParameterGroup("aurora-pg", {
		family: "aurora-postgresql16",
		parameters: [{ name: "rds.force_ssl", value: "1" }],
		tags: { Name: `${$app.name}-${$app.stage}-aurora-params` },
	});

	const cluster = new aws.rds.Cluster("aurora-cluster", {
		engine: "aurora-postgresql",
		databaseName: $app.stage,
		masterUsername: dbUser,
		masterPassword: pwd.result,

		dbSubnetGroupName: subnetGroup.name,
		vpcSecurityGroupIds: [dbSg.id],
		dbClusterParameterGroupName: pg.name,

		storageEncrypted: true,
		backupRetentionPeriod: isProd ? 7 : 1,
		deletionProtection: isProd,
		copyTagsToSnapshot: true,

		serverlessv2ScalingConfiguration: {
			minCapacity: 0.5,
			maxCapacity: isProd ? 2 : 1,
		},

		tags: { Name: `${$app.name}-${$app.stage}-aurora-cluster` },
	});

	const instance = new aws.rds.ClusterInstance("aurora-cluster-instance-1", {
		clusterIdentifier: cluster.id,
		instanceClass: "db.serverless",
		engine: "aurora-postgresql",
		engineVersion: cluster.engineVersion,
		publiclyAccessible: true,
		tags: { Name: `${$app.name}-${$app.stage}-aurora-instance-1` },
	});

	const url = pulumi.interpolate`postgresql://${dbUser}:${pwd.result}@${cluster.endpoint}:5432/${$app.stage}`;

	new aws.secretsmanager.SecretVersion(
		"db-secret-url",
		{
			secretId: secret.id,
			secretString: pulumi
				.all([pwd.result, cluster.endpoint])
				.apply(([password, host]) =>
					JSON.stringify({
						username: dbUser,
						password,
						host,
						port: 5432,
						database: $app.stage,
						url: `postgresql://${dbUser}:${password}@${host}:5432/${$app.stage}`,
					}),
				),
		},
		{ dependsOn: [secretVersion, instance] },
	);

	const Database = new sst.Linkable("Database", {
		properties: {
			url: pulumi.secret(url),
			host: cluster.endpoint,
			port: 5432,
			name: $app.stage,
		},
	});

	return {
		Database,
		url: pulumi.secret(url),
		clusterArn: cluster.arn,
		endpoint: cluster.endpoint,
		port: 5432,
		dbSgId: dbSg.id,
		subnetGroupName: subnetGroup.name,
		secretArn: secret.arn,
	};
}
