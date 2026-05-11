import express from "express";
import cors from "cors";

import { loadEnv } from "../config/env";
import { generateStructuredSummary } from "../services/structured-summary.ts";

loadEnv();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    if (!prompt || !String(prompt).trim()) {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    const structuredSummary = await generateStructuredSummary(prompt);

    return res.status(200).json(structuredSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
