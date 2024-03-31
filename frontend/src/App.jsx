import { useEffect, useState } from "react";
import Background from "./components/ui/background";
import Header from "./components/ui/header";
import scrapeLeetcode from "./utils/leetcodeScarper";
import { WavyBackgroundDemo } from "./components/ui/WavyBackground";
import HintsResponse from "./components/HintsResponse";

if (typeof window !== "undefined" && typeof chrome !== "undefined") {
  const chrome = window.chrome;
}

export default function App() {
  const [hints, setTotalHints] = useState(3);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://leetcode.com/problems/find-all-duplicates-in-an-array/?envType=daily-question&envId=2024-03-25"
  ); // State to store the URL

  // useEffect(() => {
  //   // Function to get the URL of the current tab
  //   const getCurrentTabUrl = async () => {
  //     const tabs = await chrome.tabs.query({
  //       active: true,
  //       currentWindow: true,
  //     });
  //     setUrl(tabs[0].url);
  //     console.log(url);
  //   };

  //   // Call the function to get the URL
  //   getCurrentTabUrl();
  // }, []);

  useEffect(() => {
    // Fetch data only when URL is available
    if (url) {
      // Function to fetch data
      const getData = async () => {
        console.log("getting question details");
        console.log(url);
        const answer = await scrapeLeetcode(url);
        console.log(answer);
        setResponse(answer);
        setLoading(false);
      };

      // Call the function to fetch data
      getData();
    }
  }, [url]); // Execute when URL changes

  return (
    <Background>
      {loading ? (
        <WavyBackgroundDemo />
      ) : (
        <>
          <Header setHints={setTotalHints} hints={hints} />
          <HintsResponse
            response={response}
            hints={hints}
            setHints={setTotalHints}
          />
        </>
      )}
    </Background>
  );
}
