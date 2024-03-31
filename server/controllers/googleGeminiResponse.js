import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const api_key = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(api_key);
export async function provideHints(req, res, next) {
  const { prompt } = req.body;
  const description = await prompt;
  const template = `Act as a DSA mentor and Provide me 3 hints about question and its details are as follows ${description}. Strictly follow the given template , do no send in markdown
    Provide 3 hints which range from a little bit understanding to full understanding . The first hint should help a little , the second one should help more and the third one should help very much. Always provide hints in laymen terms   Provide detailed response
    {
      "hint1":"",
      "hint2":"",
      "hint3":""
    }
    `;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(template);
  const response = await result.response;
  const text = response.text();
  const jsonData = await JSON.parse(text);
  res.send(jsonData);
}

export async function provideAnswer(req, res, next) {
  const { prompt } = req.body;
  const description = await prompt;

  const answerTemplate = `Act as professional dsa mentor and provide me complete answer about ${description} .I want an detailed answer.`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(answerTemplate);
  const response = await result.response;
  const text = response.text();
  res.send(text);
}
