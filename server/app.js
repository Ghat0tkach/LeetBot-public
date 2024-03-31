import express from "express";
import cors from "cors";
import routes from "./routes/question.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/", async (req, res, next) => {
  res.json("hello from server ");
});

app.listen(8000, () => console.log("Server has started on port 8000"));
