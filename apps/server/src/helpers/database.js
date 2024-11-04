import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const findSimilarDocuments = async (embedding) => {
  const url = process.env.DB_URI; // Replace with your MongoDB url.
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("help_center"); // Replace with your database name.
    const collection = db.collection("answers"); // Replace with your collection name.

    // Query for similar documents.
    const documents = await collection
      .aggregate([
        {
          $vectorSearch: {
            queryVector: embedding,
            path: "answer_embedding",
            numCandidates: 100,
            limit: 1,
            index: "answerIndex",
          },
        },
        {
          $project: {
            _id: 0,
            answer: 1,
            answer_sanitized: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    return documents;
  } finally {
    await client.close();
  }
};

export const database = {
  findSimilarDocuments,
};
