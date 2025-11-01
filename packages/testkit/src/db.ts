import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

export class PgTestContainer {
  private container?: StartedPostgreSqlContainer;

  async start(image = "postgres:16-alpine") {
    if (!this.container) {
      this.container = await new PostgreSqlContainer(image).start();
    }
    return this.container;
  }

  get uri() {
    if (!this.container) throw new Error("Container not started");
    return this.container.getConnectionUri();
  }

  async stop() {
    if (this.container) {
      await this.container.stop({ timeout: 1000 });
      this.container = undefined;
    }
  }
}
