import axios from "axios";

const API_URL = "https://localhost:8081/contact";

class ContactService {
  async contact(contactValues) {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactValues);
      return response.data;
    } catch (error) {
      console.error("Contact form submission failed", error);
      throw error;
    }
  }
}

const contactServiceInstance = new ContactService();
export default contactServiceInstance;
