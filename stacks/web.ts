// /// <reference types="sst" />

// import { api } from "./api";

// export function web() {
//   const Api = api();

//   const site = new sst.aws.Nextjs("Web", {
//     path: "apps/web",
//     environment: {
//       API_URL: Api.url,
//     },
//     link: [Api],
//   });

//   return site;
// }
