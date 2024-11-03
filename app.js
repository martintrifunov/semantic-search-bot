import express from "express";
import { semanticSearchController } from "./src/controllers/semanticSearchController.js";

// app setup
const app = express();
app.listen(6969, () => console.log("Listening on port 6969"));

// middleware
app.use(express.json());

// routes
app.post("/api_v1/chat", semanticSearchController.searchAction);
