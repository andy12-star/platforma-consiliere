import axios from "axios";

const API_URL = "https://localhost:8081";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        username,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
    localStorage.removeItem("user");
  }

  async register(registerValues) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/users`, registerValues);
      return response.data;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
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
