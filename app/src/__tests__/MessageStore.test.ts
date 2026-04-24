import { MessageStore } from "../MessageStore";
import fs from "fs";
import path from "path";

interface DBConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

describe("MessageStore", () => {
  let store: MessageStore;

  beforeAll(async () => {
    const dbConfig = await fetchDBConfig();
    store = new MessageStore({
      client: "pg",
      connection: {
        host: dbConfig.dbHost,
        port: dbConfig.dbPort,
        database: dbConfig.dbName,
        user: dbConfig.dbUser,
        password: dbConfig.dbPassword,
      },
    });
  }, 10_000);

  afterAll(async () => {
    await store.destroy();
  });

  it("inserts a row and returns a UUID", async () => {
    const now = new Date().toISOString();
    const id = await store.insert("unit-test", `Hello, world! ${now}`);
    console.log("id", id);

    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });
});

async function fetchDBConfig(): Promise<DBConfig> {
  const tmpCfgPath = path.join(__dirname, "..", "..", "_tmp_cfg.json");
  if (fs.existsSync(tmpCfgPath)) {
    console.log("Using existing config from ", tmpCfgPath);
    const existingConfig = fs.readFileSync(tmpCfgPath, "utf8");
    return JSON.parse(existingConfig) as DBConfig;
  }

  console.log("Fetching config from the server");
  const authToken = process.env.AUTH_TOKEN;
  if (!authToken) {
    throw new Error("AUTH_TOKEN environment variable is not set");
  }

  const allocateUrl = process.env.ALLOCATE_URL;
  if (!allocateUrl) {
    throw new Error("ALLOCATE_URL environment variable is not set");
  }

  const response = await fetch(allocateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`Failed to allocate resource: ${response.statusText}`);
  }

  const config = (await response.json()) as DBConfig;
  fs.writeFileSync(tmpCfgPath, JSON.stringify(config, null, 2));

  return config;
}
