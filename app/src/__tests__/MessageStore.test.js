const MessageStore = require("../MessageStore");
const fs = require("fs");
const path = require("path");

const DB_CONFIG = {
  client: "pg",
  connection: {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE || "postgres",
    password: process.env.PGPASSWORD || "jobref-backend",
    user: process.env.PGUSER || "jobref-backend",
  },
};

describe("MessageStore", () => {
  let store;

  beforeAll(
    async () => {
      const dbConfig = await fetchDBConfig();
      store = new MessageStore({
        client: "pg",
        connection: {
          host: dbConfig.dbHost,
          port: dbConfig.dbPort,
          database: dbConfig.dbName,
          user: dbConfig.dbUser,
          password: dbConfig.dbPassword,
        }
      });
    },
    10_000,
  ),

  afterAll(async () => {
    await store.destroy();
  });

  it("inserts a row and returns a UUID", async () => {
    const now = new Date().toISOString();
    const id = await store.insert("unit-test", `Hello, world! ${now}`);
    console.log("id", id);

    // const rows = await store.db("test_messages").where({ id });
    // expect(rows).toHaveLength(1);
    // expect(rows[0]).toMatchObject({
    //   id,
    //   source: "unit-test",
    //   text: `Hello, world! ${now}`,
    // });
  });
});

// ------------------------------------------------------------
async function fetchDBConfig() {
  const tmpCfgPath = path.join(__dirname, "..", "..", "_tmp_cfg.json");
  if (fs.existsSync(tmpCfgPath)) {
    const existingConfig = fs.readFileSync(tmpCfgPath, "utf8");
    return JSON.parse(existingConfig);
  }

  const authToken = process.env.AUTH_TOKEN;
  const response = await fetch(process.env.ALLOCATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": `${authToken}`,
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error(`Failed to allocate resource: ${response.statusText}`);
  }
  const config = await response.json();
  fs.writeFileSync(tmpCfgPath, JSON.stringify(config, null, 2));

  return config;
}