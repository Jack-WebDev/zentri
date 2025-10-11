/// <reference types="sst" />

export function Storage() {
	const isProd = $app.stage === "prod";

	const bucket = new sst.aws.Bucket(
		"Bucket",
		{
			cors: {
				allowMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
				allowOrigins: ["*"],
				allowHeaders: ["*"],
			},

			transform: {
				bucket: (args) => {
					args.bucket = `${$app.name}-${$app.stage}-storage-bucket`;

					args.forceDestroy = !isProd;
					args.tags = {
						...(args.tags ?? {}),
						Name: `${$app.name}-${$app.stage}-storage-bucket`,
					};
				},

				publicAccessBlock: (args) => {
					args.blockPublicAcls = false;
				},
			},
		},

		{ protect: isProd },
	);

	new aws.s3.BucketOwnershipControls("BucketOwnership", {
		bucket: bucket.nodes.bucket.id,
		rule: { objectOwnership: "ObjectWriter" },
	});

	return bucket;
}
