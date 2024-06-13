import React, { useState } from "react";
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

const Programari = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewAppointmentButton, setShowNewAppointmentButton] =
    useState(false);

  const appointments = [
    {
      status: "Programare onorata",
      title: "Consultatie Generala",
      date: "2024-04-05",
      time: "10:00 - 10:30",
      location: "Bucuresti Policlinica Baneasa",
      specializare: "Dr. Ion Popescu",
      doctor: "Medic generalist, Consultatie generala",
    },
    {
      status: "Programare neonorata",
      title: "Consultatie Generala",
      date: "2024-04-10",
      time: "10:00 - 10:30",
      location: "Bucuresti Policlinica Baneasa",
      specializare: "Dr. Ion Popescu",
      doctor: "Medic generalist, Consultatie generala",
    },
    {
      status: "neconfirmata",
      title: "Analize Laborator",
      date: "2024-09-07",
      time: "09:15 - 09:30",
      location: "Bucuresti Policlinica Baneasa",
      specializare: "Recoltare Sange Adulti",
      doctor: "Asistent medical, Medic specialist, Analize Laborator",
    },
    {
      status: "confirmata",
      title: "Analize Laborator",
      date: "2024-10-08",
      time: "09:15 - 09:30",
      location: "Bucuresti Policlinica Baneasa",
      specializare: "Recoltare Sange Adulti",
      doctor: "Asistent medical, Medic specialist, Analize Laborator",
    },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const appointment = appointments.find(
      (appt) => new Date(appt.date).toDateString() === date.toDateString()
    );

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

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ minHeight: "92vh", /*bgcolor: "#E1EBEE",*/ p: 1 }}
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
          {showNewAppointmentButton && (
            <StyledButton
              onClick={handleNewAppointment}
              color="primary"
              sx={{
                mr: 55,
                fontSize: "1.5rem",
                "&:hover": { bgcolor: "#FF6347" },
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
              "&:hover": { bgcolor: "#FF6347" },
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
