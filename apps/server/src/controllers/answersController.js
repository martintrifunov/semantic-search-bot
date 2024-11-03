import { answers } from "../helpers/answers.js";

const sanitizeAction = async (req, res) => {
  try {
    answers.sanitizeAnswersFromCSV();
  } catch (error) {
    return res.status(500);
  }

  return res.status(200).json("Sanitization completed!");
};

export const answersController = {
  sanitizeAction,
};
