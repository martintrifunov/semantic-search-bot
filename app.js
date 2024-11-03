import { semanticSearch } from "./src/controllers/semanticSearchController.js";
import { embeddingMath } from "./src/helpers/math.js";

const text1 = "The boy playing in the street";
const text2 = "The kid having fun in the road";

semanticSearch
  .generateEmbeddingCacheAction(text1)
  .then((embedding1) => {
    //console.log(embedding)
    semanticSearch
      .generateEmbeddingCacheAction(text2)
      .then((embedding2) => {
        //console.log(embedding2)
        console.log(embeddingMath.cosineSimilarity(embedding1, embedding2));
      });
  });
