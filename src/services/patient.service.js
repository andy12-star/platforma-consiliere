import axiosInstance from "./axiosInstance";

class PatientService {
  async getPatientsForDoctor(doctorId) {
    try {
      const response = await axiosInstance.get('/patients/'+doctorId);
      return response.data;
    } catch (error) {
      console.error("Fetching patients failed", error);
      throw error;
    }
  }

  async getAllPatients(){
    try{
      const response = await axiosInstance.get(`/patients`);
      return response.data;
    }catch(error){
      console.error("Fetching patients failed", error);
      throw error;
    }
  }
}

const patientServiceInstance = new PatientService();
export default patientServiceInstance;
