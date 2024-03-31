import { getQuestionIdBySlug } from "../controllers/getQuestion.controller.js";
import { responseAsQuestion } from "../controllers/getQuestionDetailsbyId.controller.js";
import express from "express";
import {
  provideAnswer,
  provideHints,
} from "../controllers/googleGeminiResponse.js";
const app = express.Router();

app.route("/getQuestionId/:slug").get(getQuestionIdBySlug);
app.route("/getQuestionDetails/:qid").get(responseAsQuestion);
app.route("/getHints").post(provideHints);
app.route("/getAnswer").post(provideAnswer);

export default app;
