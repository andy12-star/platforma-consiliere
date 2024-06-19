import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import { StyledButton } from "../components/styledComp";
import AppointmentService from "../services/appointment.service";
import {useAuth} from "../services/context/AuthContext";

const ModifyAppt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointment } = location.state;
const {user}=useAuth();
  const [modifiedAppointment, setModifiedAppointment] = useState(appointment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedAppointment({
      ...modifiedAppointment,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await AppointmentService.updateAppointment(
        modifiedAppointment.id,
        modifiedAppointment
      );
      navigate("/programari");
    } catch (error) {
      console.error("Failed to update appointment", error);
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
              Modifica programarea
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
              {(user.roles[0].name==="role_user") && (
                <>
              <TextField
                fullWidth
                label="Data"
                name="date"
                type="date"
                value={modifiedAppointment.date}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                fullWidth
                label="Ora"
                name="time"
                type="time"
                value={modifiedAppointment.time}
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
                label="Locatie"
                name="location"
                value={modifiedAppointment.location}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                fullWidth
                label="Specializare"
                name="specializare"
                value={modifiedAppointment.specializare}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                fullWidth
                label="Doctor"
                name="doctor"
                value={modifiedAppointment.doctor}
                onChange={handleInputChange}
                sx={{ mt: 3 }}
                InputProps={{
                  style: { fontSize: "1.5rem" },
                }}
              />
                </>
              )}
              {(user.roles[0].name==="role_doctor") && appointment.appointmentType !== 'CANCELED' && (
                <>
                  <TextField
                    fullWidth
                    label="appointmentType"
                    name="appointmentType"
                    type="appointmentType"
                    value={modifiedAppointment.date}
                    onChange={handleInputChange}
                    sx={{ mt: 3 }}
                    InputProps={{
                      style: { fontSize: "1.5rem" },
                    }}
                  > Modifica status programare</TextField>

                </>
              )}
              {(user.roles[0].name==="role_doctor") && appointment.appointmentType === 'CANCELED' && (
                <>
                  <Typography variant ='h3' sx={{
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                  }}>
                    ACEASTA PROGRAMARE NU POATE FI MODIFICATA DEOARECE A FOST ANULATA DE CATRE PACIENT!
                  </Typography>
                </>
              )}
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

export default ModifyAppt;
