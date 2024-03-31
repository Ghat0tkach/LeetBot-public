import axios from "axios";

export async function handleHintsResponse(prompt) {
  try {
    console.log(prompt);
    const response = await axios.post(
      "https://leetbot-ckvm.onrender.com/api/v1/getHints",
      {
        prompt: prompt,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
}

export async function handleAnswerResponse(prompt) {
  try {
    console.log(prompt);
    const response = await axios.post(
      "https://leetbot-ckvm.onrender.com/api/v1/getAnswer",
      {
        prompt: prompt,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
}
