import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const CACHE_FILE_PATH = path.join(__dirname, "../../embeddings/embeddings.csv");

const readCache = () => {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      fs.writeFileSync(CACHE_FILE_PATH, "text\tembedding\n", "utf-8");
      return new Map();
    }

    const cacheFile = fs.readFileSync(CACHE_FILE_PATH, "utf-8");
    const lines = cacheFile.trim().split("\n");
    const cacheMap = new Map();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line) {
        const [text, embedding] = line.split("\t");
        cacheMap.set(text, JSON.parse(embedding));
      }
    }
  } catch (error) {
    return new Map();
  }
};

const appendToCache = (text, embeddingVector) => {
  const cacheMap = readCache();

  if (cacheMap.has(text)) {
    //if file has entry no need to cache again
    return;
  }

  const vectorString = JSON.stringify(embeddingVector);
  const newCacheLine = `${text}\t${vectorString}\n`;

  fs.appendFileSync(CACHE_FILE_PATH, newCacheLine, "utf-8");

  cacheMap.set(text, embeddingVector);
};

export const cache = {
  readCache,
  appendToCache,
};
