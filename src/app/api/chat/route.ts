import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getVectorStore } from "@/lib/vector";
import { COMPANY_KNOWLEDGE_PROMPT } from "@/data/company";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing Groq API key. Set GROQ_API_KEY.");
  return new Groq({ apiKey });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const question = typeof body?.message === "string" ? body.message.trim() : "";

  if (!question) {
    return NextResponse.json({ error: "Missing message." }, { status: 400 });
  }
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Missing Groq API key." }, { status: 500 });
  }

  const vectorStore = await getVectorStore();
  const results = await vectorStore.similaritySearch(question, 3);

  const context = results.length
    ? results.map((item: any, index: number) => `Source ${index + 1}: ${item.content}`).join("\n\n")
    : "";

  const systemContent = `${COMPANY_KNOWLEDGE_PROMPT}

Use only the provided company information to answer the user. If the answer is not available in the content, say so and offer to connect the user with RFZ Digital experts.

Context:
${context}`;

  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: question },
    ],
    max_tokens: 600,
  });

  const answer =
    response.choices[0]?.message?.content ??
    "Sorry, I couldn't generate an answer right now.";

  return NextResponse.json({ reply: answer });
}