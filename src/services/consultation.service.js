import axiosInstance from "./axiosInstance";


class ConsultationService {


  async getConsultationForPatientId(patientId){
    try {
      const response = await axiosInstance.get('/consultation/patient/'+patientId);
      return response.data;
    }catch(error){
      console.error("Fetching consultation for patiend id  failed",error);
      throw error;
    }
  }

  async getConsultationForDoctorId(doctorId){
    try {
      const response = await axiosInstance.get('/consultation/doctor/'+doctorId);
      return response.data;
    }catch(error){
      console.error("Fetching consultation for doctor id  failed",error);
      throw error;
    }
  }

  async addConsultationReport(consultationData) {
    try {
      const response = await axiosInstance.post(
        `/consultation`,
        consultationData
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add consultation report", error);
      throw error;
    }
  }

  async updateConsultationReport( consultation) {
    try {
      console.log("consult",consultation);
      const response = await axiosInstance.put('/consultation/'+consultation.id, consultation);
      return response.data;
    } catch (error) {
      console.error("Failed to update consultation report", error);
      throw error;
    }
  }

  async deleteConsultationReport(appointmentId) {
    try {
      const response = await axiosInstance.delete(
        '/consultation'+appointmentId
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete consultation report", error);
      throw error;
    }
  }

  async getConsultationsForDoctorByPatient(doctorId, patientId) {
    try {
      const response = await axiosInstance.get('/consultation/doctor-patient/'+doctorId+'/'+patientId);
      return response.data;
    } catch (error) {
      console.error("Fetching consultations for doctor by patient failed", error);
      throw error;
    }
  }

}

const consulationServiceInstance = new ConsultationService();
export default consulationServiceInstance;
