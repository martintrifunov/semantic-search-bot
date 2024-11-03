import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const openAI = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORGANIZAION,
});
