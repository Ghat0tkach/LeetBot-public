import React, { useEffect, useState } from "react";
import getQuestionSlug from "../utils/splitCharacter";
import { getQuestionDetails } from "../api/getQuestionDetails";
import GlowingTags from "./ui/tags";
if (typeof window !== "undefined" && typeof chrome !== "undefined") {
  const chrome = window.chrome;
}

function LeetCodeScraper() {
  //   const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [tags, setTags] = useState([]);
  const url =
    "https://leetcode.com/problems/container-with-most-water/description/";
  useEffect(() => {
    const getTabUrl = async () => {
      //   const tabs = await chrome.tabs.query({
      //     active: true,
      //     currentWindow: true,
      //   });
      //   setUrl(tabs[0].url);
      //   setUrl(

      //   );
      const slug = getQuestionSlug(url);
      console.log(slug);
      const result = await getQuestionDetails(slug);
      console.log(result);
      setResult(result);
      console.log(result.topicTags);
      setTags(result.topicTags);
    };

    getTabUrl();
  }, []);

  return (
    <div>
      <GlowingTags tags={tags} />
      <h1>Current Tab URL:</h1>
      <p>{url}</p>
    </div>
  );
}

export default LeetCodeScraper;
