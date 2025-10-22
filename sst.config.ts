/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		const inCI = !!process.env.CI;
		return {
			name: "zentri",
			removal: input?.stage === "prod" ? "retain" : "remove",
			home: "aws",
			providers: {
				aws: inCI
					? { region: "af-south-1" }
					: { profile: "zentri-prod", region: "af-south-1" },
			},
		};
	},

	async run() {
		const { Network } = await import("./stacks/network");
		const { Storage } = await import("./stacks/storage");
		const { Database } = await import("./stacks/database");
		const { Api } = await import("./stacks/api");
		const { Web } = await import("./stacks/web");
		const { Authentication } = await import("./stacks/auth");
		const { Migration } = await import("./stacks/migration");
		const network = Network();
		const bucket = Storage();
		const db = Database({ network });
		Migration({ bucket, db });
		Authentication();
		const api = Api({ bucket, db });
		Web({ api });
	},
});
