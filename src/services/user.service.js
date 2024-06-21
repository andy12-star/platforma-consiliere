import axiosInstance from "./axiosInstance";

class UserService {

  async getUserById(userId) {
    try {
      const response = await axiosInstance.get('/users/'+userId);
      return response.data;
    } catch (error) {
      console.error("Fetching user failed", error);
      throw error;
    }
  }

  async saveUser(userData) {
    try {
      const response = await axiosInstance.put('/users/' +userData.id, userData);
      return response.data.data;
    } catch (error) {
      console.error("Updating user failed", error);
      throw error;
    }
  }


}

const userServiceInstance = new UserService();
export default userServiceInstance;