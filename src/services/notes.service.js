import axiosInstance from "./axiosInstance";

class NotesService {
  //TODO: Change to getNotesForUser(userId)
  async getNotesForUser(userId) {
    try {
      const response = await axiosInstance.get(`/notes/` + userId);
      return response.data;
    } catch (error) {
      console.error("Fetching notes failed", error);
      throw error;
    }
  }

  async addNote(note) {
    try {
      const response = await axiosInstance.post(`/notes`, note);
      return response.data;
    } catch (error) {
      console.error("Adding note failed", error);
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      const response = await axiosInstance.delete(`/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.error("Deleting note failed", error);
      throw error;
    }
  }

  //TODO: Delete and replace addNote with saveNote
  async updateNote(noteId, updatedNote) {
    try {
      const response = await axiosInstance.put(`/notes/${noteId}`, updatedNote);
      return response.data;
    } catch (error) {
      console.error("Updating note failed", error);
      throw error;
    }
  }
}

const notesServiceInstance = new NotesService();
export default notesServiceInstance;
