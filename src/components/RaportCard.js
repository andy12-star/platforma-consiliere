import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { StyledButton } from "./styledComp";
import { useNavigate } from "react-router-dom";
import consulationServiceInstance from "../services/consultation.service";

const RaportCard = ({ appointment }) => {
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newRecommandation, setNewRecommandation] = useState("");
  const [newObservation, setNewObservation] = useState("");
  const navigate = useNavigate();

  const handleTimeChange = (e) => {
    setNewTime(e.target.value);
  };

  const handleObservationChange = (e) => {
    setNewObservation(e.target.value);
  };

  const handleRecommandationChange = (e) => {
    setNewRecommandation(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDetails = async () => {
    const consultationData = {
      id: appointment.id,
      duration: newTime,
      observation: newObservation,
      recommendation: newRecommandation,
    };
    try {
      await consulationServiceInstance.addConsultationReport(consultationData);
      setOpen(false);
      // You might want to update the local state or refetch the appointments to reflect the changes
    } catch (error) {
      console.error("Failed to add consultation report", error);
    }
  };

  const handleModifyDetails = () => {
    navigate("/modifica-consultatie", {
      state: { appointment },
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        marginBottom: 3,
        marginTop: 3,
        borderRadius: 4,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            maxWidth: 450,
            marginBottom: 3,
            marginTop: 3,
            height: 80,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#E1EBEE",
            borderRadius: 5,
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            alignItems="center"
            sx={{
              mt: 4,
            }}
          >
            {appointment.name}
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h5" color="text.secondary">
            DATA CONSULTATIEI
          </Typography>
          <Typography variant="h6">{appointment.date}</Typography>
        </Box>
        {appointment.details ? (
          <>
            <StyledButton
              fullWidth
              onClick={handleModifyDetails}
              variant="contained"
              sx={{
                marginTop: 4,
                textTransform: "none",
                fontSize: "18px",
              }}
            >
              Modifica Detalii Consultatie
            </StyledButton>
          </>
        ) : (
          <StyledButton
            fullWidth
            onClick={handleClickOpen}
            variant="contained"
            sx={{
              marginTop: 4,
              textTransform: "none",
              fontSize: "18px",
            }}
          >
            Adauga Detalii Consultatie
          </StyledButton>
        )}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Adauga detalii raport
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={
                <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                  Durata sedinta
                </Typography>
              }
              fullWidth
              value={newTime}
              onChange={handleTimeChange}
              InputProps={{
                style: { fontSize: "1.5rem" },
              }}
            />
            <TextField
              margin="dense"
              label={
                <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                  Observatii
                </Typography>
              }
              fullWidth
              multiline
              rows={4}
              value={newObservation}
              onChange={handleObservationChange}
              InputProps={{
                style: { fontSize: "1.5rem" },
              }}
            />
            <TextField
              margin="dense"
              label={
                <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                  Recomandari
                </Typography>
              }
              fullWidth
              multiline
              rows={4}
              value={newRecommandation}
              onChange={handleRecommandationChange}
              InputProps={{
                style: { fontSize: "1.5rem" },
              }}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton
              onClick={handleClose}
              color="primary"
              sx={{ fontSize: "1.5rem" }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color="primary"
              sx={{ fontSize: "1.5rem" }}
              onClick={handleAddDetails}
            >
              Adauga
            </StyledButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RaportCard;
