import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = 'https://localhost:8081/api/v1';

class ContactService {

  async contact(contactValues) {
    try {
      const response = await axios.post(`${BASE_URL}/email/contact`, contactValues);
      return response.data;
    } catch (error) {
      console.error("Contact form submission failed", error);
      throw error;
    }
  }
}

const contactServiceInstance = new ContactService();
export default contactServiceInstance;
