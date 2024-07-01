import axiosInstance from "./axiosInstance";

class TestService {
  async saveTestResults(responses, userId, testType) {

    const testData = (await axiosInstance.get(`/testresults/` + userId)).data;
    console.log("Test data before new results: ", testData);
    try {
      if (testType === "personality") {
        testData.personality = this.calculateMeanScore(responses);
      } else if (testType === "smi") {
        testData.smi = this.calculateMeanScore(responses);
      } else if (testType === "ysq") {
        const ysqScores = this.calculateYSQScores(responses);
        testData.ysqEmotionalPrivacy = ysqScores["Privatiune Emotionala"];
        testData.ysqInstability = ysqScores["Instabilitate"];
        testData.ysqDoubt = ysqScores["Neincredere"];
      }
      console.log("Test data after new results: ", testData);
      const response = await axiosInstance.post(`/testresults`, testData);
      return response.data;
    } catch (error) {
      console.error(`Failed to save test results`, error);
      throw error;
    }
  }

  async getTestResultsForPatient(userId) {
    try {
      const response = await axiosInstance.get(`/testresults/`+userId);
      return response.data;
    } catch (error) {
      console.error(`Failed to get test results for the given id`, error);
      throw error;
    }
  }

  calculateMeanScore(responses) {
    console.log("responses: ", responses);
    const sum = responses.reduce((acc, val) => acc + val, 0);
    return sum / responses.length;
  }

  calculateYSQScores(responses) {
    const categories = {
      "Privatiune Emotionala": [1, 2, 3],
      "Instabilitate": [4, 5, 6],
      "Neincredere": [7, 8, 9],
    };

    const scores = {};

    for (const category in categories) {
      const questionIndices = categories[category];
      const totalScore = questionIndices.reduce(
        (sum, index) => sum + responses[index - 1],
        0
      );
      scores[category] = totalScore;
    }

    return scores;
  }
}

const testServiceInstance = new TestService();
export default testServiceInstance;
