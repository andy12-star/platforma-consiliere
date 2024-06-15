import axios from "axios";

const API_URL = "https://localhost:8081/test";

class TestService {
  async submitTest(testType, responses) {
    try {
      const response = await axios.post(`${API_URL}/tests/${testType}`, {
        responses,
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to submit ${testType} test`, error);
      throw error;
    }
  }

  async getTestResults(testType) {
    try {
      const response = await axios.get(`${API_URL}/tests/results/${testType}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get ${testType} test results`, error);
      throw error;
    }
  }
}

const testServiceInstance = new TestService();
export default testServiceInstance;
