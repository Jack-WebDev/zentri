import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export function resolveSecretName(input: string) {
	const prefix = `${$app.name}/${$app.stage}/`;
	return input.startsWith(prefix) ? input : `${prefix}${input}`;
}

export function getSecretValues<T extends readonly string[]>(
	name: string,
	keys: T,
): Record<T[number], pulumi.Output<string>> {
	const secret = aws.secretsmanager.getSecretOutput({
		name: resolveSecretName(name),
	});
	const version = aws.secretsmanager.getSecretVersionOutput({
		secretId: secret.id,
	});

	const parsed = pulumi
		.secret(version.secretString)
		.apply((s) => JSON.parse(s ?? "{}"));

	const out = {} as Record<T[number], pulumi.Output<string>>;
	for (const k of keys) out[k] = pulumi.output(parsed).apply((j) => j[k] ?? "");
	return out;
}
