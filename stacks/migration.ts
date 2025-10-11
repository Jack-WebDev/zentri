// /// <reference types="sst" />

// import { database } from "./database";
// import { storage } from "./storage";
// import { network } from "./network";

// export function migration() {
//   const db = database();
//   const bucket = storage();
//   const net = network();

//   const fn = new sst.aws.Function("DatabaseMigrator", {
//     name: `${$app.name}-${$app.stage}-migration`,
//     handler: "apps/server/src/lambda/db/migration.handler",

//     link: [db, bucket],

//     vpc: net.vpc,

//     environment: {
//       REGION: $app.providers.aws.region,
//       STAGE: $app.stage,
//     },

//     nodejs: {
//       install: ["drizzle-orm", "pg"],
//     },

//     copyFiles: [
//       { from: "apps/server/dist/db/migrations", to: "./apps/server/db/migrations" },
//       { from: "apps/server/dist/db/seeds", to: "./apps/server/db/seeds" },
//     ],

//     timeout: "15 minutes",
//     memory: "1024 MB",
//   });

//   return fn;
// }
