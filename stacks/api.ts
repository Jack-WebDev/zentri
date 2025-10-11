// /// <reference types="sst" />

// import { database } from "./database";
// import { storage } from "./storage";

// export function api() {
//   const bucket = storage();
//   const db = database();

//   const environment = {
//     REGION: $app.providers.aws.region,
//     STAGE: $app.stage,
//     ATTACHMENTS_BUCKET_NAME: bucket.name,
//     ATTACHMENTS_REGION: $app.providers.aws.region,
//     DATABASE_URL: db.url,
//     SERVER_PORT: "8080",
//   };

//   const api = new sst.aws.ApiGatewayV2("Api", {
//     accessLog: { retention: "1 month" },
//     link: [bucket],
//     transform: {
//       route: {
//         handler: (args) => {
//           args.environment = { ...environment, ...(args.environment ?? {}) };
//           args.timeout ??= "60 seconds";
//         },
//       },
//     },
//   });

//   const identityAuth = api.addAuthorizer({
//     name: "IdentityAuthorizer",
//     lambda: {
//       function: {
//         handler: "apps/server/src/lambda/authorizer/identity.handler",
//         link: [bucket],
//         environment,
//         name: `${$app.name}-${$app.stage}-identity-authorizer`,
//       },
//       response: "iam",
//     },
//   });

//   api.route(
//     "POST /trpc",
//     {
//       handler: "apps/server/src/lambda/trpc/server.handler",
//       timeout: "60 seconds",
//       environment,
//     },
//     {
//       auth: { lambda: identityAuth.id },
//     }
//   );

//   return api;
// }
