// import { loadEnv } from "./env";
import { loadEnv } from "./config/env";
import { generateText } from "./provider";

async function main() {
  loadEnv();

  try {
    const response = await generateText();

    process.stdout.write(JSON.stringify(response, null, 2) + "\n");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(message);
    process.exit(1);
  }
}

main();
