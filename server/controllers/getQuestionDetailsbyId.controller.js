import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

export const responseAsQuestion = async (req, res, next) => {
  try {
    const { qid } = await req.params;
    if (!qid) {
      console.log("qid not found");
    }
    const details = await getDetails(qid);
    res.send(details);
  } catch (err) {
    console.log("ERROR:", err.message);
  }
};

const getDetails = async (qid) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  const url = `https://scuffedcode.chowkabhara.com/questions/${qid}`;
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // Wait for the .mb-10 element to be present
  await page.waitForSelector(".mb-10");

  const description = await page.evaluate(() => {
    const mb10Element = document.querySelector(".mb-10");
    const text = mb10Element.innerText.trim();
    const endIndex = text.indexOf("Similar Questions");
    if (endIndex !== -1) {
      return text.substring(0, endIndex).trim();
    } else {
      return text;
    }
  });

  //   console.log(description);

  // Wait for the .block.relative.w-full element to be present
  await page.waitForSelector(".block.relative.w-full");
  await page.evaluate(() => {
    const button = document.querySelector(".block.relative.w-full button");
    if (button) {
      button.click();
    }
  });

  // Wait for the questions to become visible
  //   await page.waitForSelector(".block.relative.w-full .list-inside");

  const sendResponse = await page.evaluate(() => {
    const similarQuestionItems = document.querySelectorAll(
      ".block.relative.w-full .list-inside li"
    );
    const similarQuestions = [];

    similarQuestionItems.forEach((item) => {
      const linkElement = item.querySelector("a");
      const titleElement = item.querySelector("h2");
      const href = linkElement.getAttribute("href");
      const difficultyElement = item.querySelector(
        ".text-difficulty-Medium, .text-difficulty-Hard,.text-difficulty-Easy"
      );

      // Check if title and difficulty elements exist before accessing their innerText
      const title = titleElement ? titleElement.innerText.trim() : "";
      const difficulty = difficultyElement
        ? difficultyElement.innerText.trim()
        : "";

      similarQuestions.push({ title, href, difficulty });
    });

    return similarQuestions;
  });
  console.log(description);
  await browser.close();
  return { description, sendResponse };
};
