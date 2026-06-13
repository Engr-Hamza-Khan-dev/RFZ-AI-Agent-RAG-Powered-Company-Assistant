import { CohereClient } from "cohere-ai";
import { COMPANY_KNOWLEDGE_DOCS, type KnowledgeDocument } from "@/data/company";

function getCohereClient() {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error("Missing Cohere API key. Set COHERE_API_KEY.");
  return new CohereClient({ token: apiKey });
}

interface VectorStoreItem {
  doc: KnowledgeDocument;
  embedding: number[];
}

let vectorStoreCache: VectorStoreItem[] | null = null;

function dot(a: number[], b: number[]) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}
function magnitude(v: number[]) {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
}
function cosineSimilarity(a: number[], b: number[]) {
  return dot(a, b) / (magnitude(a) * magnitude(b) + Number.EPSILON);
}

async function buildVectorStore() {
  if (vectorStoreCache) return vectorStoreCache;

  const cohere = getCohereClient();

  const response = await cohere.embed({
    texts: COMPANY_KNOWLEDGE_DOCS.map((doc) => doc.content),
    model: "embed-english-v3.0",
    inputType: "search_document",
    embeddingTypes: ["float"],
  });

  const embeddings = Array.isArray(response.embeddings)
    ? (response.embeddings as number[][])
    : (response.embeddings as { float: number[][] }).float!;

  vectorStoreCache = COMPANY_KNOWLEDGE_DOCS.map((doc, index) => ({
    doc,
    embedding: embeddings[index],
  }));

  return vectorStoreCache;
}

export async function getVectorStore() {
  await buildVectorStore();

  return {
    similaritySearch: async (query: string, k = 3) => {
      if (!query) return [];
      if (!vectorStoreCache) await buildVectorStore();

      const cohere = getCohereClient();

      const response = await cohere.embed({
        texts: [query],
        model: "embed-english-v3.0",
        inputType: "search_query",
        embeddingTypes: ["float"],
      });

      const embeddingsResult = Array.isArray(response.embeddings)
        ? (response.embeddings as number[][])
        : (response.embeddings as { float: number[][] }).float!;

      const queryEmbedding = embeddingsResult[0];

      return vectorStoreCache!
        .map((item) => ({
          ...item.doc,
          score: cosineSimilarity(item.embedding, queryEmbedding),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
    },
  };
}
