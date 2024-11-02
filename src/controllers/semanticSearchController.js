import { openAI } from "../config/openAIConfig";

const generateEmbeddingAction = async (text) => {
  const response = await openAI.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response.data.data[0].embedding;
};
