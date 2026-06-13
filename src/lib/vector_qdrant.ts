import { CohereClient } from "cohere-ai";
import { qdrant } from "./qdrant";
import { COMPANY_KNOWLEDGE_DOCS, type KnowledgeDocument } from "@/data/company";

function getCohereClient() {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error("Missing Cohere API key. Set COHERE_API_KEY.");
  return new CohereClient({ token: apiKey });
}

const COLLECTION = process.env.QDRANT_COLLECTION ?? "rfz-knowledge";

export async function getVectorStore() {
  const cohere = getCohereClient();

  // Embed all documents and upsert into Qdrant (id = index)
  const resp = await cohere.embed({
    texts: COMPANY_KNOWLEDGE_DOCS.map((d) => d.content),
    model: "embed-english-v3.0",
    inputType: "search_document",
    embeddingTypes: ["float"],
  });

  const embeddings: number[][] = Array.isArray(resp.embeddings)
    ? (resp.embeddings as number[][])
    : (resp.embeddings as { float: number[][] }).float!;

  const points = COMPANY_KNOWLEDGE_DOCS.map((doc, idx) => ({
    // Qdrant requires point IDs to be either a positive integer or a UUID string.
    // Use 1-based numeric IDs to avoid '0' being treated as invalid.
    id: idx + 1,
    vector: embeddings[idx],
    payload: doc as unknown as Record<string, unknown>,
  }));

  await qdrant.upsert(COLLECTION, { points });

  return {
    similaritySearch: async (query: string, k = 3) => {
      if (!query) return [];

      const qresp = await cohere.embed({
        texts: [query],
        model: "embed-english-v3.0",
        inputType: "search_query",
        embeddingTypes: ["float"],
      });

      const qEmb: number[] = Array.isArray(qresp.embeddings)
        ? (qresp.embeddings as number[][])[0]
        : (qresp.embeddings as { float: number[][] }).float![0];

      const searchRes = await qdrant.search(COLLECTION, {
        vector: qEmb,
        limit: k,
        with_payload: true,
      });

      const results = (searchRes as any).result ?? searchRes;

      return results.map((r: any) => {
        const payload = r.payload as KnowledgeDocument;
        return { ...payload, score: r.score ?? 0 };
      });
    },
  };
}
