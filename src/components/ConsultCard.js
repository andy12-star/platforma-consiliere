import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  DialogTitle,
  Dialog,
  DialogContent,
  Divider,
  DialogActions,
  TextField,
} from "@mui/material";
import { StyledButton } from "./styledComp";
import { useAuth } from "../services/context/AuthContext";
import ConsultationService from "../services/consultation.service";

const ConsultCard = (consultation) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [consultationData, setConsultationData] = useState({
    duration: consultation.duration,
    observations: consultation.observations,
    recommendations: consultation.recommendations,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false); // Reset edit mode on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultationData({ ...consultationData, [name]: value });
  };

  const handleSave = async () => {
    const updatedConsultation = {
      ...consultation,
      ...consultationData,
    };
    try {
      await ConsultationService.updateConsultationReport(updatedConsultation);
      alert("Consultation updated");
      setEditMode(false);
      handleClose();
    } catch (error) {
      console.error("Failed to update consultation", error);
    }
  };

  const getFormattedTime = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return dateObj.toLocaleTimeString('en-US', options);
  };

  return (
    <Card
      sx={{
        maxWidth: 600, // Increased width
        marginBottom: 4,
        marginTop: 4,
        borderRadius: 6,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            maxWidth: 600, // Increased width
            marginBottom: 3,
            marginTop: 3,
            height: 150, // Increased height
            display: "flex",
            flexDirection: "column",
            bgcolor: "#E1EBEE",
            borderRadius: 5,
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {user.roles[0].name === 'role_user'  && (
            <Typography
              variant="h4" // Increased font size
              alignItems="center"
              sx={{
                mt: 6,
              }}
            >
              Dr. {consultation.doctorName}
            </Typography>
          )}
          { user.roles[0].name === 'role_admin' && (
            <div>
              <Typography
                variant="h4" // Increased font size
                alignItems="center"
                sx={{
                  mt: 8,
                }}
              >
                Dr. {consultation.doctorName} & {consultation.patientName}
              </Typography>

            </div>
          )}
          {user.roles[0].name === 'role_doctor'  && (
            <Typography
              variant="h4" // Increased font size
              alignItems="center"
              sx={{
                mt: 6,
              }}
            >
              {consultation.patientName}
            </Typography>
          )}
        </Box>
        <Box marginTop={2}>
          <Typography variant="h4" color="text.secondary"> {/* Increased font size */}
            DATA SI ORA CONSULTATIEI
          </Typography>
          <Typography variant="h5">{consultation.date.split("T")[0]}</Typography> {/* Increased font size */}
          <Typography variant="h5">{getFormattedTime(consultation.date)}</Typography> {/* Increased font size */}
        </Box>
        <StyledButton
          fullWidth
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            marginTop: 4,
            textTransform: "none",
            fontSize: "20px", // Increased font size
          }}
        >
          VEZI DETALII RAPORT
        </StyledButton>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Detalii raport
          </DialogTitle>
          <DialogContent>
            <Box sx={{ p: 1 }}>
              {user.roles[0].name === 'role_user' && (
                <>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    TRIMIS DE:
                  </Typography>
                  <Typography variant="h4">{consultation.doctorName}</Typography>
                  <Divider />
                </>
              )}
              {user.roles[0].name === 'role_doctor' && (
                <>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    PACIENT:
                  </Typography>
                  <Typography variant="h4">
                    {consultation.patientName}
                  </Typography>
                  <Divider />
                </>
              )}
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SERVICII
              </Typography>
              <Typography variant="h4">{consultation.specialization}</Typography>
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DURATA SEDINTEI
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  name="duration"
                  value={consultationData.duration}
                  onChange={handleInputChange}
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  margin="normal"
                />
              ) : (
                <Typography variant="h4">{consultationData.duration}</Typography>
              )}
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                OBSERVATII :
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  name="observations"
                  value={consultationData.observations}
                  onChange={handleInputChange}
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  margin="normal"
                />
              ) : (
                <Typography variant="h4">{consultationData.observations}</Typography>
              )}
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                RECOMANDARI
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  name="recommendations"
                  value={consultationData.recommendations}
                  onChange={handleInputChange}
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  margin="normal"
                />
              ) : (
                <Typography variant="h4">{consultationData.recommendations}</Typography>
              )}
              <Divider />
            </Box>
          </DialogContent>
          <DialogActions>
            {user.roles[0].name === 'role_doctor' && (
              <>
                {editMode ? (
                  <>
                    <StyledButton
                      onClick={handleSave}
                      variant="contained"
                      sx={{
                        mr: 4,
                        mt: 3,
                        fontSize: "1.5rem",
                      }}
                    >
                      Salvează
                    </StyledButton>
                    <StyledButton
                      onClick={() => setEditMode(false)}
                      variant="contained"
                      sx={{
                        mr: 4,
                        mt: 3,
                        fontSize: "1.5rem",
                      }}
                    >
                      Anulează
                    </StyledButton>
                  </>
                ) : (
                  <StyledButton
                    onClick={() => setEditMode(true)}
                    variant="contained"
                    sx={{
                      mr: 4,
                      mt: 3,
                      fontSize: "1.5rem",
                    }}
                  >
                    Modifica
                  </StyledButton>
                )}
              </>
            )}
            <StyledButton
              onClick={handleClose}
              variant="contained"
              sx={{
                mr: 4,
                mt: 3,
                fontSize: "1.5rem"                  }}>
              Inchide
            </StyledButton>

        </DialogActions>
      </Dialog>
    </CardContent>
</Card>
);
};

export default ConsultCard;

