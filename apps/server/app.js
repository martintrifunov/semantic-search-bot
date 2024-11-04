import express from "express";
import { semanticSearchController } from "./src/controllers/semanticSearchController.js";
import corsOptions from "./src/config/corsOptions.js";
import cors from "cors";
import { answersController } from "./src/controllers/answersController.js";
import { db } from "./src/config/dbConfig.js";

// app setup
const app = express();
app.listen(6969, () => console.log("Listening on port 6969"));

// cors
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// db connection
db.run().catch(console.dir);

// routes
app.post("/api/v1/chat", semanticSearchController.searchMongoAction);
app.get("/api/v1/sanitize-answers", answersController.sanitizeAction);
