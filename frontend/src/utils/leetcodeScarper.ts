import getQuestionSlug from "./splitCharacter";
import { getQuestionDetails } from "../api/getQuestionDetails";

async function scrapeLeetCode(url) {
  try {
    const slug = getQuestionSlug(url);
    const result = await getQuestionDetails(slug);
    return result;
  } catch (error) {
    console.error("Error scraping LeetCode:", error);
    return null;
  }
}

export default scrapeLeetCode;
// function LeetCodeScraper() {
//   const url =
//     "https://leetcode.com/problems/container-with-most-water/description/";
//   useEffect(() => {
//     const getTabUrl = async () => {
//       //   const tabs = await chrome.tabs.query({
//       //     active: true,
//       //     currentWindow: true,
//       //   });
//       //   setUrl(tabs[0].url);
//       //   setUrl(

//       //   );
//       const slug = getQuestionSlug(url);
//       console.log(slug);
//       const result = await getQuestionDetails(slug);
//       console.log(result);
//       setResult(result);
//       console.log(result.topicTags);
//       setTags(result.topicTags);
//     };

//     getTabUrl();
//   }, []);
// }

// export default LeetCodeScraper;
