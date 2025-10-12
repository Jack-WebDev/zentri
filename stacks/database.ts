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
		description: "RDS Postgres public access",
		tags: { Name: `${$app.name}-${$app.stage}-db-sg` },
	});

	new aws.vpc.SecurityGroupIngressRule("db-5432-ingress", {
		securityGroupId: dbSg.id,
		ipProtocol: "tcp",
		fromPort: 5432,
		toPort: 5432,
		cidrIpv4: "0.0.0.0/0",
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

	const pg = new aws.rds.ParameterGroup("pg-params", {
		family: "postgres16",
		parameters: [
			{ name: "rds.force_ssl", value: "1" },
			{ name: "log_connections", value: "1" },
			{ name: "log_disconnections", value: "1" },
			{ name: "log_min_duration_statement", value: "2000" },
		],
		tags: { Name: `${$app.name}-${$app.stage}-pg-params` },
	});

	const username = "appuser";
	const pwd = new random.RandomPassword("db-password", {
		length: 20,
		overrideSpecial: "_-",
	});

	const secret = new aws.secretsmanager.Secret("db-prod-secret", {
		name: `${$app.name}/${$app.stage}/db`,
		description: "RDS Postgres credentials",
	});

	const instance = new aws.rds.Instance("rds-postgres", {
		engine: "postgres",
		engineVersion: "16",
		instanceClass: "db.t4g.micro",
		allocatedStorage: 20,
		maxAllocatedStorage: 20,
		storageType: "gp2",
		multiAz: false,
		dbSubnetGroupName: subnetGroup.name,
		vpcSecurityGroupIds: [dbSg.id],
		publiclyAccessible: true,
		username,
		password: pwd.result,
		storageEncrypted: true,
		backupRetentionPeriod: 1,
		deletionProtection: isProd,
		autoMinorVersionUpgrade: true,
		parameterGroupName: pg.name,
		copyTagsToSnapshot: true,
		performanceInsightsEnabled: false,
		enabledCloudwatchLogsExports: [],
		tags: { Name: `${$app.name}-${$app.stage}-rds-postgres` },
	});

	const url = pulumi.interpolate`postgresql://${username}:${pwd.result}@${instance.address}:5432/${$app.stage}`;

	const secretVersion = new aws.secretsmanager.SecretVersion(
		"db-prod-secret-version",
		{
			secretId: secret.id,
			secretString: pulumi.secret(
				pulumi.interpolate`{
        "host": "${instance.address}",
        "port": "5432",
        "username": "${username}",
        "password": "${pwd.result}",
        "dbname": "${$app.stage}",
        "url": "postgresql://${username}:${pwd.result}@${instance.address}:5432/${$app.stage}"
      }`,
			),
		},
	);

	const Database = new sst.Linkable("Database", {
		properties: {
			url: pulumi.secret(url),
			host: instance.address,
			port: 5432,
			name: $app.stage,
		},
	});

	return {
		Database,
		url: pulumi.secret(url),
		endpoint: instance.address,
		port: 5432,
		dbSgId: dbSg.id,
		subnetGroupName: subnetGroup.name,
		secretArn: secret.arn,
		secretVersionId: secretVersion.versionId,
	};
}
