import axiosInstance from "./axiosInstance";

class AppointmentService {
  async getAppointmentsForPatient(patientId) {
    try {
      const response = await axiosInstance.get('/appointment/patient/' + patientId);
      return response.data;
    } catch (error) {
      console.error("Fetching appointments for patient failed", error);
      throw error;
    }
  }

  async getAppointmentsForDoctor(doctorId) {
    try {
      const response = await axiosInstance.get('/appointment/doctor/' + doctorId);
      return response.data;
    } catch (error) {
      console.error("Fetching appointments for doctor failed", error);
      throw error;
    }
  }

  async saveAppointment(appointment) {
    try {
      const response = await axiosInstance.post('/appointment', appointment);
      return response.data;
    } catch (error) {
      console.error("Saving appointment failed", error);
      throw error;
    }
  }

  async deleteAppointment(appointmentId) {
    try {
      const response = await axiosInstance.delete('/appointment/' + appointmentId);
      return response.data;
    } catch (error) {
      console.error("Deleting appointment failed", error);
      throw error;
    }
  }

  async updateAppointment(appointment) {
    try {
      const response = await axiosInstance.put('/appointment/' + appointment.id, appointment);
      return response.data;
    } catch (error) {
      console.error("Updating appointment failed", error);
      throw error;
    }
  }


  async getAppointmentsForDoctorAndDate(doctorId, date) {
    try {
      const response = await axiosInstance.get('/appointments/doctor/' + doctorId + '/date/' + date);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch appointments for doctor and date", error);
      throw error;
    }
  }
}

const appointmentServiceInstance = new AppointmentService();
export default appointmentServiceInstance;
