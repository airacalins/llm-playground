"use client";

import { FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Answer = {
  summary: string;
  confidence: number;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
        }),
      });

      console.log("response", response);

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(response.statusText || "Request failed");
      }

      setAnswers((previous) => [...previous, data]);

      setPrompt("");

      inputRef.current?.focus();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-zinc-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hello Agent - Ask anything
          </h1>
        </header>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Answers</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {answers.length === 0 ? (
              <p className="text-sm text-zinc-600">
                No answers yet. Ask a question below.
              </p>
            ) : (
              answers.map((answer, index) => (
                <div
                  key={`${answer.summary}-${index}`}
                  className="rounded-xl border border-zinc-200 bg-white p-4"
                >
                  <p className="text-sm leading-6 text-zinc-900">
                    {answer.summary}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Confidence: {answer.confidence}%
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="sticky bottom-0 mt-4 bg-zinc-50 py-4"
        >
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Type your question"
              disabled={isLoading}
              className="h-12"
            />

            <Button type="submit" disabled={isLoading} className="h-12 px-6">
              {isLoading ? "Thinking..." : "Ask"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
