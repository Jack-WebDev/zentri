/// <reference types="sst" />

type ApiReturn = ReturnType<typeof import("./api").Api>;

export function Web({ api: Api }: { api: ApiReturn }) {
  const site = new sst.aws.Nextjs("Web", {
    path: "apps/web",
    environment: {
      BETTER_AUTH_URL: Api.url,
      NEXT_PUBLIC_SERVER_URL: Api.url,
      API_URL: Api.url,
      NODE_EXTRA_CA_CERTS: "certs/af-south-1-bundle.pem",
    },
    link: [Api],

    transform: {
      server(args) {
        args.copyFiles = [
          ...(Array.isArray(args.copyFiles) ? args.copyFiles : []),
          {
            from: "packages/infra/certs/af-south-1-bundle.pem",
            to: "certs/af-south-1-bundle.pem",
          },
        ];

        args.environment = {
          ...(args.environment ?? {}),
        };
      },
    },
  });

  return site;
}
