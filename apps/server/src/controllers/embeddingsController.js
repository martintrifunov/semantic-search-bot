import { openAI } from "../config/openAIConfig.js";
import { cache } from "../helpers/cache.js";
import dotenv from "dotenv";
dotenv.config();

const generateEmbeddingAction = async (text) => {
  const response = await openAI.embeddings.create({
    model: process.env.EMBEDDINGS_MODEL,
    input: text,
  });

  return response.data[0].embedding;
};

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

export const embeddingsController = {
  generateEmbeddingAction,
  generateEmbeddingCacheAction,
};
