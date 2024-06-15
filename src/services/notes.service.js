import axios from "axios";

const API_URL = "https://localhost:8081/notes";

class NotesService {
  async getNotes() {
    try {
      const response = await axios.get(`${API_URL}/notes`);
      return response.data;
    } catch (error) {
      console.error("Fetching notes failed", error);
      throw error;
    }
  }

  async addNote(note) {
    try {
      const response = await axios.post(`${API_URL}/notes`, note);
      return response.data;
    } catch (error) {
      console.error("Adding note failed", error);
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      const response = await axios.delete(`${API_URL}/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.error("Deleting note failed", error);
      throw error;
    }
  }

  async updateNote(noteId, updatedNote) {
    try {
      const response = await axios.put(
        `${API_URL}/notes/${noteId}`,
        updatedNote
      );
      return response.data;
    } catch (error) {
      console.error("Updating note failed", error);
      throw error;
    }
  }
}

const notesServiceInstance = new NotesService();
export default notesServiceInstance;
