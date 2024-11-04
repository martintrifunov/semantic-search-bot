import { answers } from "../helpers/answers.js";
import { database } from "../helpers/database.js";
import { embeddingMath } from "../helpers/math.js";
import { embeddingsController } from "./embeddingsController.js";

const searchAction = async (req, res) => {
  const { query, perPage } = req.body;

  const ANSWERS_LIST = answers.loadAnswersFromCSV();

  const searchTermEmbedding =
    await embeddingsController.generateEmbeddingCacheAction(query);

  let similarities = [];

  for (let i = 0; i < ANSWERS_LIST.length; i++) {
    const answer = ANSWERS_LIST[i];

    const answerEmbedding =
      await embeddingsController.generateEmbeddingCacheAction(answer);

    const similarity = embeddingMath.cosineSimilarity(
      searchTermEmbedding,
      answerEmbedding
    );

    similarities.push({ index: i, text: answer, similarity });
  }

  similarities.sort((a, b) => b.similarity - a.similarity);

  return res.status(200).json(similarities.slice(0, perPage));
};

const searchMongoAction = async (req, res) => {
  const { query } = req.body;

  const searchTermEmbedding =
    await embeddingsController.generateEmbeddingAction(query);

  const answer = await database.findSimilarDocuments(searchTermEmbedding);

  console.log(answer);

  return res.status(200).json(answer);
};

export const semanticSearchController = {
  searchAction,
  searchMongoAction,
};
