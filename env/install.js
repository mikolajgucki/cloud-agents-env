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
  console.log("Starting environment install...");
  await postLog({ request: "install" });
  console.log("Environment installed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
