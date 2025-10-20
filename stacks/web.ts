/// <reference types="sst" />

type ApiReturn = ReturnType<typeof import("./api").Api>;

export function Web({ api: Api }: { api: ApiReturn }) {
  const site = new sst.aws.Nextjs("Web", {
    path: "apps/web",
    environment: {
      BETTER_AUTH_URL: Api.url,
      NEXT_PUBLIC_SERVER_URL: Api.url,
      API_URL: Api.url,
    },
    link: [Api],
  });

  return site;
}
