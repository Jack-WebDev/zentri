// /// <reference types="sst" />

// import * as aws from "@pulumi/aws";
// import * as random from "@pulumi/random";
// import * as pulumi from "@pulumi/pulumi";
// import { network } from "./network";

// export function database() {
//   const isProd = $app.stage === "prod";
//   const multiAz = isProd;
//   const backupRetentionPeriod = isProd ? 7 : 0;
//   const deletionProtection = isProd;

//   const net = network();

//   const dbSg = new aws.ec2.SecurityGroup("db-sg", {
//     vpcId: net.vpcId,
//     description: "Postgres access",
//     tags: { Name: `${$app.name}-${$app.stage}-db-sg` },
//   });

//   new aws.vpc.SecurityGroupIngressRule("db-5432-ingress", {
//     securityGroupId: dbSg.id,
//     ipProtocol: "tcp",
//     fromPort: 5432,
//     toPort: 5432,
//     cidrIpv4: "10.0.0.0/16",
//     description: "Postgres from app subnets/SG",
//   });

//   new aws.vpc.SecurityGroupEgressRule("db-egress-all", {
//     securityGroupId: dbSg.id,
//     ipProtocol: "-1",
//     cidrIpv4: "0.0.0.0/0",
//     description: "Allow all outbound",
//   });

//   const dbSubnetGroup = new aws.rds.SubnetGroup("db-subnet-group", {
//     subnetIds: net.publicSubnetIds,
//     tags: { Name: `${$app.name}-${$app.stage}-db-subnet-group` },
//   });

//   const dbUser = "appuser";
//   const pwd = new random.RandomPassword("db-password", {
//     length: 20,
//     overrideSpecial: "_-",
//   });

//   const secret = new aws.secretsmanager.Secret("db-secret", {
//     name: `${$app.name}/${$app.stage}/db`,
//     description: "Database credentials",
//   });

//   const secretVersion = new aws.secretsmanager.SecretVersion("db-secret-v1", {
//     secretId: secret.id,
//     secretString: pwd.result.apply((password) =>
//       JSON.stringify({ username: dbUser, password })
//     ),
//   });

//   const db = new aws.rds.Instance("postgres-db", {
//     engine: "postgres",
//     engineVersion: "14.17",
//     instanceClass: "db.m5.large",

//     allocatedStorage: 10,
//     maxAllocatedStorage: 20,
//     storageType: "gp3",

//     dbSubnetGroupName: dbSubnetGroup.name,
//     vpcSecurityGroupIds: [dbSg.id],

//     publiclyAccessible: true,
//     multiAz,
//     autoMinorVersionUpgrade: true,
//     allowMajorVersionUpgrade: false,
//     backupRetentionPeriod,

//     identifier: `${$app.name}-${$app.stage}-db`,
//     dbName: $app.stage,

//     username: dbUser,
//     password: pwd.result,

//     deletionProtection,
//     skipFinalSnapshot: !isProd,
//     finalSnapshotIdentifier: isProd
//       ? `${$app.name}-${$app.stage}-db-final`
//       : undefined,
//   });

//   const url = pulumi.interpolate`postgresql://${dbUser}:${pwd.result}@${db.address}:${db.port}/${$app.stage}`;

//   new aws.secretsmanager.SecretVersion(
//     "db-secret-url",
//     {
//       secretId: secret.id,
//       secretString: pulumi
//         .all([pwd.result, db.address, db.port])
//         .apply(([password, host, port]) =>
//           JSON.stringify({
//             username: dbUser,
//             password,
//             host,
//             port,
//             database: $app.stage,
//             url: `postgresql://${dbUser}:${password}@${host}:${port}/${$app.stage}`,
//           })
//         ),
//     },
//     { dependsOn: [secretVersion, db] }
//   );

//   const Database = new sst.Linkable("Database", {
//     properties: {
//       url: pulumi.secret(url),
//       host: db.address,
//       port: db.port,
//       name: $app.stage,
//     },
//   });

//   return {
//     Database,
//     url: pulumi.secret(url),
//     dbArn: db.arn,
//     dbEndpoint: db.address,
//     dbPort: db.port,
//     dbSgId: dbSg.id,
//     dbSubnetGroup: dbSubnetGroup.name,
//     secretArn: secret.arn,
//   };
// }
