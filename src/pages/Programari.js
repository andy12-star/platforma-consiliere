import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledCalendar, StyledButton } from "../components/styledComp";
import { useNavigate } from "react-router-dom";
import styles from "./mainPages.module.css";
import AppointmentService from "../services/appointment.service";

const Programari = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewAppointmentButton, setShowNewAppointmentButton] =
    useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const appointmentsData = await AppointmentService.getAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
      // For demonstration purposes, use the provided appointments array
      setAppointments([
        {
          id: 1,
          status: " onorata",
          title: "Consultatie Generala",
          date: "2024-04-05",
          time: "10:00 - 10:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Consultatie generala",
          doctor: "Dr. Ion Popescu",
          details: {
            duration: "30 min",
            observation: "All good.",
            recommendation: "Continue with current treatment.",
          },
        },
        {
          id: 2,
          status: " neonorata",
          title: "Consultatie Generala",
          date: "2024-04-10",
          time: "10:00 - 10:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Consultatie generala",
          doctor: "Dr. Ion Popescu",
          details: null,
        },
        {
          id: 3,
          status: "neconfirmata",
          title: "Analize Laborator",
          date: "2024-09-07",
          time: "09:15 - 09:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Recoltare Sange Adulti",
          doctor: "Asistent medical, Medic specialist, Analize Laborator",
          details: null,
        },
        {
          id: 4,
          status: "confirmata",
          title: "Analize Laborator",
          date: "2024-10-08",
          time: "09:15 - 09:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Recoltare Sange Adulti",
          doctor: "Asistent medical, Medic specialist, Analize Laborator",
          details: {
            duration: "15 min",
            observation: "Sample collected successfully.",
            recommendation: "Results will be available in 2 days.",
          },
        },
        {
          id: 5,
          status: " onorata",
          title: "Control Ortopedie",
          date: "2024-05-15",
          time: "11:00 - 11:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Ortopedie",
          doctor: "Dr. Alexandru Marinescu",
          details: {
            duration: "30 min",
            observation: "Patient recovering well from surgery.",
            recommendation: "Physiotherapy recommended.",
          },
        },
        {
          id: 6,
          status: "Programare neonorata",
          title: "Control Dermatologie",
          date: "2024-06-20",
          time: "12:00 - 12:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Dermatologie",
          doctor: "Dr. Ana Ionescu",
          details: null,
        },
        {
          id: 7,
          status: "neconfirmata",
          title: "Consult Nutritie",
          date: "2024-07-10",
          time: "14:00 - 14:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Nutritie",
          doctor: "Dr. Maria Popa",
          details: null,
        },
        {
          id: 8,
          status: "confirmata",
          date: "2024-08-12",
          time: "14:00 - 14:30",
          location: "Bucuresti Policlinica Baneasa",
          specializare: "Nutritie",
          doctor: "Dr. Maria Popa",
          details: {
            duration: "30 min",
            observation: "Discussed dietary habits.",
            recommendation: "Follow new diet plan.",
          },
        },
      ]);
    }
  };

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
      fetchAppointments(); // Refresh the appointments list
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete appointment", error);
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
                Programare {selectedAppointment.status}
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
                {selectedAppointment.specializare}
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
                Doctor:
              </Typography>
              <Typography variant="h4">{selectedAppointment.doctor}</Typography>
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
              </>
            )}
          {showNewAppointmentButton && (
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
