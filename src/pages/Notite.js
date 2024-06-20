import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserNav from "../components/UserNav";
import { StyledButton } from "../components/styledComp";
import NotesService from "../services/notes.service";
import styles from "./mainPages.module.css";
import { useAuth } from "../services/context/AuthContext";

const Notite = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  var dateOptions = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    fetchNotes();
  });

  const fetchNotes = async () => {
    try {
      const data = await NotesService.getNotesForUser(user.id);
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  const handleNoteTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleNoteTextChange = (e) => {
    setNewNoteText(e.target.value);
  };

  const handleAddNote = async () => {
    if (newNoteTitle.trim() === "" || newNoteText.trim() === "") return;

    const newNote = {
      title: newNoteTitle,
      notes: newNoteText,
      userId: user.id,
    };

    try {
      await NotesService.addNote(newNote);
      const updatedNotes = await NotesService.getNotesForUser(user.id);
      setNotes(updatedNotes);
      setNewNoteTitle("");
      setNewNoteText("");
      setOpen(false);
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{
          minHeight: "92vh",
          p: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              mt: 4,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Notite
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={4}
            textAlign="center"
            sx={{
              minHeight: "92vh",
              p: 3,
              bgcolor: "#ffffff",
              padding: 3,
              borderRadius: 2,

              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <StyledButton
              onClick={handleClickOpen}
              variant="contained"
              sx={{
                mt: 3,
                mb: 3,
              }}
            >
              Adauga Notita
            </StyledButton>
            <Box sx={{ width: "100%" }}>
              {notes.map((note) => (
                <Accordion
                  key={note.id}
                  sx={{
                    bgcolor: "#F0F8FF",
                    marginBottom: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${note.id}-content`}
                    id={`panel-${note.id}-header`}
                  >
                    <Typography variant="h4">{note.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="h5" textAlign="left">
                      {note.notes}
                    </Typography>
                    <Typography variant="h6" display="block" gutterBottom>
                      Created at{" "}
                      {
                        new Date(note.createdAt)
                          .toLocaleDateString("en-US", dateOptions)
                          .split("T")[0]
                      }
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Adauga Notita
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label={
                    <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                      Titlu
                    </Typography>
                  }
                  fullWidth
                  value={newNoteTitle}
                  onChange={handleNoteTitleChange}
                  InputProps={{
                    style: { fontSize: "1.5rem" },
                  }}
                />
                <TextField
                  margin="dense"
                  label={
                    <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                      Notita
                    </Typography>
                  }
                  fullWidth
                  multiline
                  rows={4}
                  value={newNoteText}
                  onChange={handleNoteTextChange}
                  InputProps={{
                    style: { fontSize: "1.5rem" },
                  }}
                />
              </DialogContent>
              <DialogActions>
                <StyledButton
                  onClick={handleClose}
                  color="primary"
                  sx={{ fontSize: "1.5rem", mr: 3 }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={handleAddNote}
                  color="primary"
                  sx={{ fontSize: "1.5rem", mr: 3 }}
                >
                  Adauga
                </StyledButton>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default Notite;
