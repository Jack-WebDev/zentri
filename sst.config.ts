/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		const inCI = !!process.env.CI;
		return {
			name: "zentri",
			removal: input?.stage === "prod" ? "retain" : "remove",
			protect: ["prod"].includes(input?.stage),
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

		const network = Network();
		Storage();
		Database({ network });
	},
});
