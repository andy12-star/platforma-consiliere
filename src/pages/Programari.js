import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledCalendar, StyledButton } from "../components/styledComp";
import { useNavigate } from "react-router-dom";
import styles from "./mainPages.module.css";
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";

const Programari = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewAppointmentButton, setShowNewAppointmentButton] =
    useState(false);
  const [appointments, setAppointments] = useState([]);


  const fetchAppointmentsForPatient = async (userId) => {
    try {
      const appointmentsData = await AppointmentService.getAppointmentsForPatient(
        userId
      );
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchAppointmentsForPatient(user.id);

    }
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const appointment = appointments.find(
      (appt) => new Date(appt.date).toDateString() === date.toDateString()
    );
    const currentDate = new Date();
    if (date < currentDate) {
      if (!appointment) {
        const day = date.getDay();
        if (day === 0 || day === 6) {
          setDialogContent("Clinica este închisă.");
        } else {
          setDialogContent("Nu există programare.");
        }
        setOpen(true);
        setSelectedAppointment(null);
      } else {
        setSelectedAppointment(appointment);
        setOpen(true);
        setShowNewAppointmentButton(false);
      }
    } else {
      if (!appointment) {
        const day = date.getDay();
        if (day === 0 || day === 6) {
          setDialogContent("Clinica este închisă.");
          setShowNewAppointmentButton(false);
        } else {
          setDialogContent("Nu există programare.");
          setShowNewAppointmentButton(true);
        }
        setOpen(true);
        setSelectedAppointment(null);
      } else {
        setSelectedAppointment(appointment);
        setOpen(true);
        setShowNewAppointmentButton(false);
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const appointment = appointments.find(
        (appt) => new Date(appt.date).toDateString() === date.toDateString()
      );
      if (appointment) {
        const appointmentDate = new Date(appointment.date);
        const currentDate = new Date();

        if (appointmentDate < currentDate) {
          return appointment.status === "Programare onorata"
            ? "appointment-onored"
            : "appointment-not-onored";
        } else if (appointmentDate > currentDate) {
          return appointment.status === "neconfirmata"
            ? "appointment-future-unconfirmed"
            : "appointment-future-confirmed";
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewAppointment = () => {
    navigate("/programare");
  };

  const handleModifyAppointment = () => {
    navigate("/modifica-programare", {
      state: { appointment: selectedAppointment },
    });
  };

  const handleDeleteAppointment = async () => {
    try {
      await AppointmentService.deleteAppointment(selectedAppointment.id);
      fetchAppointmentsForPatient(user.id); // Refresh the appointments list
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await AppointmentService.updateAppointment(appointmentId, { appointmentType: 'CANCELED' });
      if (response) {
        console.log('Appointment canceled successfully');
      }
    } catch (error) {
      console.error('Failed to cancel the appointment', error);
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
            marginTop={4}
          >
            <Typography
              variant="h2"
              marginBottom={2}
              sx={{
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Bine ați venit la pagina programărilor
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <StyledCalendar
                onChange={handleDateChange}
                value={selectedDate}
                view="month"
                tileClassName={tileClassName}
                sx={{ mt: 3 }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedAppointment ? (
            <Box sx={{ p: 1 }}>
              <Typography
                sx={{
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Programare {selectedAppointment.appointmentType}
              </Typography>
              <Divider />

              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                  mt: 3,
                }}
              >
                {selectedAppointment.title}
              </Typography>
              <Divider />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Data:
              </Typography>
              <Typography variant="h4">{selectedAppointment.date}</Typography>
              <Divider />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ora:
              </Typography>
              <Typography variant="h4">{selectedAppointment.time}</Typography>
              <Divider />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Locatie:
              </Typography>
              <Typography variant="h4">
                {selectedAppointment.location}
              </Typography>
              <Divider />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Specializare:
              </Typography>
              <Typography variant="h4">
                {selectedAppointment.specialization}
              </Typography>
              <Divider />
              {(user.roles[0].name==="role_user") &&(
                <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Doctor:
              </Typography>
              <Typography variant="h4">{selectedAppointment.doctor}</Typography>
                </>
            )}
              {(user.roles[0].name==="role_doctor") &&(
                <>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Pacient:
                  </Typography>
                  <Typography variant="h4">{selectedAppointment.patient}</Typography>
                </>
              )}
          <Divider />
            </Box>
          ) : (
            <Box sx={{ p: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {dialogContent}
              </Typography>
              <Divider />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedAppointment &&
            new Date(selectedAppointment.date) > new Date() && (
              <>
                <StyledButton
                  onClick={handleModifyAppointment}
                  color="primary"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Modifica Programare
                </StyledButton>

                <StyledButton
                  onClick={handleDeleteAppointment}
                  color="secondary"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Sterge Programare
                </StyledButton>

                <StyledButton
                  onClick={handleCancelAppointment}
                  color="secondary"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Anuleaza Programare
                </StyledButton>
              </>
            )}
          {showNewAppointmentButton && (user.roles[0].name==="role_admin"|| user.roles[0].name==="role_user") &&(
            <StyledButton
              onClick={handleNewAppointment}
              color="primary"
              sx={{
                mr: 55,
                fontSize: "1.5rem",
              }}
            >
              Programare Nouă
            </StyledButton>
          )}
          <StyledButton
            onClick={handleClose}
            color="primary"
            sx={{
              mr: 4,
              fontSize: "1.5rem",
            }}
          >
            Închide
          </StyledButton>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default Programari;
