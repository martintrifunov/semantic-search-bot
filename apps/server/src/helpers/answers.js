import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const RAW_ANSWERS_FILE_PATH = path.join(
  __dirname,
  "../../../../data/answers.csv"
);
const SANITIZED_ANSWERS_FILE_PATH = path.join(
  __dirname,
  "../../../../data/formattedAnswers.csv"
);

const sanitizeAnswersFromCSV = () => {
  const answersFile = fs.readFileSync(RAW_ANSWERS_FILE_PATH, "utf8");
  const lines = answersFile.split("\n").slice(1);
  const answersList = [];

  lines.forEach((line) => {
    const match = line.match(/^(\d+),"(.*)"$/);
    if (match) {
      const body = match[2].replace(/""/g, '"');
      answersList.push(body);
    }
  });
  const formattedAnswers = answersList.join("\n");
  fs.writeFileSync(SANITIZED_ANSWERS_FILE_PATH, formattedAnswers, "utf8");
};

const loadAnswersFromCSV = () => {
  const sanitizedFileContent = fs.readFileSync(
    SANITIZED_ANSWERS_FILE_PATH,
    "utf8"
  );
  const answersArray = sanitizedFileContent
    .split("\n")
    .filter((line) => line.trim() !== "");
  return answersArray;
};

export const answers = {
  sanitizeAnswersFromCSV,
  loadAnswersFromCSV,
};
