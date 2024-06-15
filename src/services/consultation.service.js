import axios from "axios";

const API_URL = "https://localhost:8081/consultation";

class ConsultationService {
  async getConsultationReport(appointmentId) {
    try {
      const response = await axios.get(
        `${API_URL}/consultations/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch consultation report", error);
      throw error;
    }
  }

  async addConsultationReport(consultationData) {
    try {
      const response = await axios.post(
        `${API_URL}/consultations`,
        consultationData
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add consultation report", error);
      throw error;
    }
  }

  async updateConsultationReport(appointmentId, consultationData) {
    try {
      const response = await axios.put(
        `${API_URL}/consultations/${appointmentId}`,
        consultationData
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update consultation report", error);
      throw error;
    }
  }

  async deleteConsultationReport(appointmentId) {
    try {
      const response = await axios.delete(
        `${API_URL}/consultations/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete consultation report", error);
      throw error;
    }
  }
}

const consulationServiceInstance = new ConsultationService();
export default consulationServiceInstance;
