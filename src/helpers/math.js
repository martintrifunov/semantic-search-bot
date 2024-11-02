/**
 * Calculates the cosine similarity between two vectors.
 * @param {*} vectorA
 * @param {*} vectorB
 * @returns {number}
 */
const cosineSimilarity = (vectorA, vectorB) => {
  return dotProduct(vectorA, vectorB) / (norm(vectorA) * norm(vectorB));
};

/**
 * Calculates the squared distance between two vectors
 * @param {*} vector
 * @returns {number}
 */
const norm = (vector) => {
  let sum = 0;

  for (let i = 0; i < vector.length; i++) {
    sum += vector[i] * vector[i];
  }

  return Math.sqrt(sum);
};

/**
 * Calculates the dot product of two vectors of the same length
 * @param {*} vectorA
 * @param {*} vectorB
 * @returns {number}
 * @throws {Error}
 */
const dotProduct = (vectorA, vectorB) => {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vectors must be of the same length!");
  }

  let product = 0;

  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i];
  }

  return product;
};

export const embeddingMath = {
  cosineSimilarity,
};
