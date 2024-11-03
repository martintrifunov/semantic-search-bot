import { openAI } from "../config/openAIConfig.js";
import { cache } from "../helpers/cache.js";

const generateEmbeddingCacheAction = async (text) => {
  const cacheMap = cache.readCache();

  if (cacheMap.has(text)) {
    return cacheMap.get(text);
  } else {
    const embeddingVector = await generateEmbeddingAction(text);

    cache.appendToCache(text, embeddingVector);

    return embeddingVector;
  }
};

const generateEmbeddingAction = async (text) => {
  const response = await openAI.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response.data.data[0].embedding;
};

export const semanticSearch = {
  generateEmbeddingAction,
  generateEmbeddingCacheAction,
};
