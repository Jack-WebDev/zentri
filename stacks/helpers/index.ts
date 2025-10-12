import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export function resolveSecretName(input: string) {
  const prefix = `/${$app.stage}/${$app.name}/`;
  const normalized = input.replaceAll("/", "-");
  return input.startsWith(prefix) ? input : `${prefix}${normalized}`;
}

export function getSecretValues<T extends readonly string[]>(
  name: string,
  keys: T
): Record<T[number], pulumi.Output<string>> {
  const secretName = resolveSecretName(name);

  const secret = aws.secretsmanager.getSecretOutput({ name: secretName });
  const version = aws.secretsmanager.getSecretVersionOutput({
    secretId: secret.id,
  });

  const parsed = pulumi
    .secret(version.secretString)
    .apply((s) => JSON.parse(s ?? "{}") as Record<string, string>);

  const out = {} as Record<T[number], pulumi.Output<string>>;
  for (const k of keys) {
    out[k] = pulumi.output(parsed).apply((j) => j[k] ?? "");
  }
  return out;
}
