type LlmProvider = "groq";

type LlmResponse = {
  ok: true;
  provider: LlmProvider;
  model: string;
  message: string;
};

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function generateText(): Promise<LlmResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ API key");
  }

  const model = "llama-3.1-8b-instant";
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: "Hello!",
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as GroqChatCompletionResponse;

  const content =
    json.choices?.[0]?.message?.content ?? "No response generated";

  return {
    ok: true,
    provider: "groq",
    model,
    message: String(content).trim(),
  };
}
