import { embeddingsController } from "./src/controllers/embeddingsController.js";
import { semanticSearchController } from "./src/controllers/semanticSearchController.js";
import { embeddingMath } from "./src/helpers/math.js";

// const text1 = "The boy playing in the street";
// const text2 = "The kid having fun in the road";

// embeddingsController.generateEmbeddingCacheAction(text1).then((embedding1) => {
//   //console.log(embedding)
//   semanticSearch.generateEmbeddingCacheAction(text2).then((embedding2) => {
//     //console.log(embedding2)
//     console.log(embeddingMath.cosineSimilarity(embedding1, embedding2));
//   });
// });

semanticSearchController
  .searchAction("It's really rainy outside", 5)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
