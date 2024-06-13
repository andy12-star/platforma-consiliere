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
import styles from "./mainPages.module.css";

const initialNotes = {
  2023: [
    {
      id: 1,
      title: "Consultation with Dr. Smith",
      text: "Discussed general health.",
      date: "2023-01-15",
    },
    {
      id: 2,
      title: "Follow-up for blood test",
      text: "Reviewed blood test results.",
      date: "2023-02-10",
    },
  ],
  2024: [
    {
      id: 1,
      title: "Scheduled surgery with Dr. Lee",
      text: "Preparation for surgery.",
      date: "2024-03-05",
    },
    {
      id: 2,
      title: "Post-surgery checkup",
      text: "Recovery plan and next steps.",
      date: "2024-04-20",
    },
  ],
};

const Notite = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem("appointmentNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointmentNotes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleNoteTextChange = (e) => {
    setNewNoteText(e.target.value);
  };

  const handleAddNote = () => {
    if (newNoteTitle.trim() === "" || newNoteText.trim() === "") return;

    const currentDate = new Date().toISOString().split("T")[0];
    const currentYear = new Date().getFullYear();
    const updatedNotes = {
      ...notes,
      [currentYear]: [
        ...(notes[currentYear] || []),
        {
          id: Date.now(),
          title: newNoteTitle,
          text: newNoteText,
          date: currentDate,
        },
      ],
    };

    setNotes(updatedNotes);
    setNewNoteTitle("");
    setNewNoteText("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupedNotesByYear = Object.keys(notes).sort((a, b) => b - a);

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
          // bgcolor: "#E1EBEE",
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
            sx={{ minHeight: "92vh", p: 3, bgcolor: "#ffffff" }}
          >
            <StyledButton
              onClick={handleClickOpen}
              sx={{
                mt: 3,
                mb: 3,
                bgcolor: "#B9D9EB",
                "&:hover": { bgcolor: "#B2BAC2" },
              }}
            >
              Adauga Notita
            </StyledButton>
            <Box sx={{ width: "100%" }}>
              {groupedNotesByYear.map((year) => (
                <Box key={year} marginBottom={4}>
                  <Typography
                    variant="h4"
                    textAlign="left"
                    gutterBottom
                    sx={{
                      ml: 10,
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {year}
                  </Typography>
                  {notes[year].map((note) => (
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
                          {note.text}
                        </Typography>
                        <Typography variant="h5" display="block" gutterBottom>
                          Date: {note.date}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
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
