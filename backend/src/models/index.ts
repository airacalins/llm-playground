import { loadEnv } from "../config/env";
import { ChatGroq } from "@langchain/groq";

export type AiProvider = "groq";

type CreateChatModelResult = {
  provider: AiProvider;
  model: ChatGroq;
};

export function createChatModel(): CreateChatModelResult {
  loadEnv();

  const model = new ChatGroq({
    temperature: 0,
    model: "llama-3.3-70b-versatile",
  });

  return {
    provider: "groq",
    model,
  };
}
