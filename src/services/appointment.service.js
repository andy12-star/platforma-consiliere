import axios from "axios";

const API_URL = "https://localhost:8081/appt";

class AppointmentService {
  async getAppointments() {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments", error);
      throw error;
    }
  }

  async createAppointment(appointment) {
    try {
      const response = await axios.post(`${API_URL}/appointments`, appointment);
      return response.data;
    } catch (error) {
      console.error("Error creating appointment", error);
      throw error;
    }
  }

  async updateAppointment(id, updatedAppointment) {
    try {
      const response = await axios.put(
        `${API_URL}/appointments/${id}`,
        updatedAppointment
      );
      return response.data;
    } catch (error) {
      console.error("Error updating appointment", error);
      throw error;
    }
  }

  async deleteAppointment(id) {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
    } catch (error) {
      console.error("Error deleting appointment", error);
      throw error;
    }
  }

  async getAppointmentById(id) {
    try {
      const response = await axios.get(`${API_URL}/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment details", error);
      throw error;
    }
  }
}

const apptServiceInstance = new AppointmentService();
export default apptServiceInstance;
