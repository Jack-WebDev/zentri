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
			},
		},
		{ protect: isProd },
	);

	new aws.s3.BucketOwnershipControls("BucketOwnership", {
		bucket: bucket.nodes.bucket.id,
		rule: { objectOwnership: "BucketOwnerEnforced" },
	});

	new aws.s3.BucketLifecycleConfigurationV2("BucketLifecycle", {
		bucket: bucket.nodes.bucket.id,
		rules: [
			{
				id: "AbortIncompleteMPU",
				status: "Enabled",
				abortIncompleteMultipartUpload: { daysAfterInitiation: 7 },
				filter: {},
			},
			{
				id: "NoncurrentCleanup",
				status: "Enabled",
				noncurrentVersionExpiration: { noncurrentDays: 30 },
				filter: {},
			},
		],
	});

	return bucket;
}
