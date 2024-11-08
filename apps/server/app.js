import express from "express";
import { semanticSearchController } from "./src/controllers/semanticSearchController.js";
import corsOptions from "./src/config/corsOptions.js";
import cors from "cors";
import { answersController } from "./src/controllers/answersController.js";

// app setup
const app = express();
app.listen(6969, () => console.log("Listening on port 6969"));

//cors
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// routes
app.post("/api/v1/chat", semanticSearchController.searchAction);
app.get("/api/v1/sanitize-answers", answersController.sanitizeAction);