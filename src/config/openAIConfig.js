import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

export const openAI = new OpenAIApi(configuration);
