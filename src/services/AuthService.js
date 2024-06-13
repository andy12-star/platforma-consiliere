import axios from "axios";

const API_URL = "http://localhost:8080";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, {
        username,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  async register(registerValues) {
    try {
      const response = await axios.post(`${API_URL}/register`, registerValues);
      return response.data;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  }

  async contact(contactValues) {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactValues);
      return response.data;
    } catch (error) {
      console.error("Contact form submission failed", error);
      throw error;
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
      });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Refresh token failed", error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
