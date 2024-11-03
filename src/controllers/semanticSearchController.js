import { embeddingMath } from "../helpers/math.js";
import { embeddingsController } from "./embeddingsController.js";

const ANSWERS_LIST = [
  "It's raining cats and dogs outside",
  "It's pouring rain outside",
  "The weather outside is awful, it's a complete downpour",
  "The rain is coming down heavily outside",
  "Outside, it's a torrential downpour",
  "I need to pick up some groceries",
  "I need to do some grocery shopping",
  "I have to buy some groceries",
  "I need to go shopping for food",
  "I need to get some food from the supermarket",
  "Il pleut des cordes dehors.",
  "Il pleut à verse dehors.",
  "Le temps dehors est horrible, c'est une véritable averse.",
  "La pluie tombe fortement dehors.",
  "Dehors, c'est une pluie torrentielle.",
  "J'ai besoin d'acheter des courses.",
  "Je dois faire des courses.",
  "Je dois acheter des provisions.",
  "Je dois aller faire des courses alimentaires.",
  "Je dois prendre de la nourriture au supermarché."
];

const searchAction = async (req, res) => {
  const { query, perPage } = req.body;

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

  res.status(200).json(similarities.slice(0, perPage));
};

export const semanticSearchController = {
  searchAction,
};
