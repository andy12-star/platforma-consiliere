import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import { StyledButton } from "../components/styledComp";
import consulationServiceInstance from "../services/consultation.service";

const ModifyConsult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointment } = location.state;

  const initialDetails = appointment.details || {
    duration: "",
    observation: "",
    recommendation: "",
  };

  const [modifiedConsult, setModifiedConsult] = useState(initialDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedConsult({
      ...modifiedConsult,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await consulationServiceInstance.updateConsultationReport(
        appointment.id,
        modifiedConsult
      );
      navigate("/rapoarte");
    } catch (error) {
      console.error("Failed to update consultation", error);
    }
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ minHeight: "92vh", p: 1 }}
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            sx={{
              mt: 5,
              minHeight: "40vh",
              bgcolor: "#ffff",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h2"
              marginBottom={2}
              sx={{
                mt: 5,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Modifica Consultatia
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{
                minHeight: "30vh",
                width: "80vh",
                bgcolor: "#F0808040",
                p: 1,
                mb: 5,
              }}
            >
              <TextField
                fullWidth
                label="Durata"
                name="duration"
                value={modifiedConsult.duration}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                fullWidth
                label="Observatii"
                name="observation"
                value={modifiedConsult.observation}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                fullWidth
                label="Recomandari"
                name="recommendation"
                value={modifiedConsult.recommendation}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
            </Box>
            <StyledButton
              onClick={handleSave}
              color="primary"
              sx={{ fontSize: "1.5rem", mt: 3 }}
            >
              Salvează Modificările
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default ModifyConsult;
