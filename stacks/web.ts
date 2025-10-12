/// <reference types="sst" />

type ApiReturn = ReturnType<typeof import("./api").Api>;
type AuthReturn = ReturnType<typeof import("./auth").Authentication>;

export function Web({ api: Api, auth }: { api: ApiReturn; auth: AuthReturn }) {
	const site = new sst.aws.Nextjs("Web", {
		path: "apps/web",
		environment: {
			API_URL: Api.url,
		},
		link: [Api, auth],
	});

	return site;
}
