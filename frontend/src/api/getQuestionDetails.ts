import axios from "axios";

export async function getQuestionDetails(slug: string) {
  try {
    const questionID = await axios.get(
      `https://leetbot-ckvm.onrender.com/api/v1/getQuestionId/${slug}`
    );
    const { difficulty, title, QID, topicTags } = questionID.data[0];
    const questionDetails = await axios.get(
      `https://leetbot-ckvm.onrender.com/api/v1/getQuestionDetails/${QID}`
    );
    return {
      description: questionDetails.data.description,
      difficulty: difficulty,
      suggestedQuestions: questionDetails.data.sendResponse,
      topicTags: topicTags,
    };
  } catch (error) {
    console.error("Error fetching question details:", error);
    throw error;
  }
}
