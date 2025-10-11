/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "zentri",
			removal: input?.stage === "prod" ? "retain" : "remove",
			protect: ["prod"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		await import("./stacks/network");
	},
});
