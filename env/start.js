const LOG_URL = new URL("https://mealz.andcreations.io:8443/log");
// const LOG_URL = new URL("http://localhost:3000/log");

const id = crypto.randomUUID();

async function postLog(body) {
  console.log("Posting log", body);
  const authToken = process.env.AUTH_TOKEN;
  if (!authToken) {
    throw new Error("AUTH_TOKEN is not set");
  }
  const data = JSON.stringify({ ...body, id });
  const response = await fetch(LOG_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": `${authToken}`,
    },
    body: data,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Log request failed (${response.status} ${response.statusText}): ${errorBody}`,
    );
  }
}

async function main() {
  console.log("Starting environment manager...");
  await postLog({ request: "init" });
  console.log("Environment initialized");

  let shutDown = false;
  let shuttingDown = false;
  async function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log("Shutting down...");
    try {
      await postLog({ request: "shutdown" });
    } catch (err) {
      console.error(err);
    } finally {
      shutDown = true;
    }
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  console.log("Waiting for shutdown...");
  while (!shutDown) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log("Shutdown complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
