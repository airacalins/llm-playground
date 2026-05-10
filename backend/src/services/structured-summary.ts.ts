import { createChatModel } from "../models";
import { ChatResponse, ChatResponseSchema } from "../schema/chat";

export async function generateStructuredSummary(
  query: string,
): Promise<ChatResponse> {
  const { model } = createChatModel();

  const system =
    "You are a concise assistant. Return only valid structured output.";

  const user = `
    Summarize for a beginner:
    "${query}"
    Return:
    - summary (short paragraph)
    - confidence (1-100)
    `;

  const structured = model.withStructuredOutput(ChatResponseSchema);

  const response = await structured.invoke([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  return response;
}
