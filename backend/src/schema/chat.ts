import { z } from "zod";

export const ChatResponseSchema = z.object({
  summary: z.string().min(1).max(1000),
  confidence: z.number().min(1).max(100),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;
