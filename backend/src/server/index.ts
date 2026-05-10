import express from "express";
import cors from "cors";

import { loadEnv } from "../config/env";
import { generateStructuredSummary } from "../services/structured-summary.ts";

loadEnv();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const query = req.body?.query;

    if (!query || !String(query).trim()) {
      return res.status(400).json({ error: "Invalid query" });
    }

    const structuredSummary = await generateStructuredSummary(query);

    return res.status(200).json(structuredSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
