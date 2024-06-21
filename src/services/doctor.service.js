import axiosInstance from "./axiosInstance";

class DoctorService {
  async getDoctorsForPatient(patientId) {
    try {
      const response = await axiosInstance.get('/doctors/'+patientId);
      return response.data;
    } catch (error) {
      console.error("Fetching doctors failed", error);
      throw error;
    }
  }

  async getAllDoctors() {
    try{
      const response = await axiosInstance.get(`/doctors`);
      console.log("getAllDoctors", response.data)
      return response.data;
    } catch (error){
      console.error("Fetching doctors failed", error);
      throw error;
    }
  }
}

const doctorServiceInstance = new DoctorService();
export default doctorServiceInstance;

