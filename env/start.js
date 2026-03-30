const LOG_URL = new URL("https://mealz.andcreations.io:8443/log");
// const LOG_URL = new URL("http://localhost:3000/log");

const id = crypto.randomUUID();

function postLog(body) {
  const data = JSON.stringify({ ...body, id });
  return fetch(LOG_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
    body: data,
  });
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
