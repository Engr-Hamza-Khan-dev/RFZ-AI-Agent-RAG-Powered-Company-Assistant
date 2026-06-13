// Dynamic wrapper that loads either the Qdrant-backed or Cohere in-memory vector store.
export async function getVectorStore() {
  if (process.env.QDRANT_URL) {
    const mod = await import("./vector_qdrant");
    return mod.getVectorStore();
  }

  const mod = await import("./vector_cohere");
  return mod.getVectorStore();
}