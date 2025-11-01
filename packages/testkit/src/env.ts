export type TestEnv = {
  DATABASE_URL?: string;
};

export function withTestEnv(env: TestEnv) {
  for (const [k, v] of Object.entries(env)) {
    if (v !== undefined) process.env[k] = v;
  }
}
