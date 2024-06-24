import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  List,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledCalendar, StyledButton } from "../components/styledComp";
import { useNavigate } from "react-router-dom";
import styles from "./mainPages.module.css";
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";
import {date} from "yup";
import {format} from "date-fns";


const holidays = [
  { month: 0, day: 1 },
  { month: 0, day: 2 },
  { month: 3, day: 20 },
  { month: 3, day: 21 },
  { month: 3, day: 22 },
  { month: 4, day: 1 },
  { month: 5, day: 1 },
  { month: 5, day: 24 },
  { month: 7, day: 15 },
  { month: 10, day: 30 },
  { month: 11, day: 1 },
  { month: 11, day: 25 },
  { month: 11, day: 26 },
];

const isHoliday = (date) => {
  return holidays.some(
    (holiday) =>
      holiday.day === date.getDate() &&
      holiday.month === date.getMonth()
  );
};

const Programari = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [showNewAppointmentButton, setShowNewAppointmentButton] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentsForDoctor = async (userId) => {
    try {
      const appointmentsData = await AppointmentService.getAppointmentsForDoctor(userId);

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  const fetchAppointmentsForPatient = async (userId) => {
    try {
      const appointmentsData = await AppointmentService.getAppointmentsForPatient(userId);
      console.log("appt");
      console.log(appointmentsData)
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      if (user.roles[0].name === "role_user") {
        fetchAppointmentsForPatient(user.id);
      } else if (user.roles[0].name === "role_doctor") {
        fetchAppointmentsForDoctor(user.id);
      }
    }
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredAppointments = appointments.filter(
      (appt) => new Date(appt.date).toDateString() === date.toDateString()
    );
    const currentDate = new Date();
    if (date < currentDate) {
      if (isHoliday(date)) {
        setDialogContent("Clinica este închisă (Sărbătoare).");
        setOpen(true);
        setSelectedAppointments([]);
      } else if (filteredAppointments.length === 0) {
        const day = date.getDay();
        if (day === 0 || day === 6) {
          setDialogContent("Clinica este închisă.");
        } else {
          setDialogContent("Nu există programare.");
        }
        setOpen(true);
        setSelectedAppointments([]);
      } else {
        setSelectedAppointments(filteredAppointments);
        setOpen(true);
        setShowNewAppointmentButton(false);
      }
    } else {
      if (isHoliday(date)) {
        setDialogContent("Clinica este închisă (Sărbătoare).");
        setOpen(true);
        setSelectedAppointments([]);
        setShowNewAppointmentButton(false);
      } else if (filteredAppointments.length === 0) {
        const day = date.getDay();
        if (day === 0 || day === 6) {
          setDialogContent("Clinica este închisă.");
          setShowNewAppointmentButton(false);
        } else {
          setDialogContent("Nu există programare.");
          setShowNewAppointmentButton(true);
        }
        setOpen(true);
        setSelectedAppointments([]);
      } else {
        setSelectedAppointments(filteredAppointments);
        setOpen(true);
        setShowNewAppointmentButton(true);
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (isHoliday(date)) {
        return "holiday";
      }
      const appointment = appointments.find(
        (appt) => new Date(appt.date).toDateString() === date.toDateString()
      );
      if (appointment) {
        const appointmentDate = new Date(appointment.date);
        const currentDate = new Date();

        if (appointmentDate < currentDate) {
          return appointment.appointmentType === "HONORED"
            ? "HONORED"
            : "UNHONORED";
        } else if (appointmentDate > currentDate) {
          return appointment.appointmentType === "UNCONFIRMED"
            ? "UNCONFIRMED"
            : "CONFIRMED";
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewAppointment = () => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    navigate("/programare", {
      state: { selectedDate: selectedDateString },
    });
  };

  const handleModifyAppointment = (appointment) => {
    navigate("/modifica-programare", {
      state: { appointment: { ...appointment, doctor: appointment.doctor || { id: "", firstName: "", lastName: "" } } },
    });
  };


  const getFormattedTime = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return dateObj.toLocaleTimeString('en-US', options);
  };

  const handleCancelAppointment = async (appointment) => {
    try {
      console.log('Canceling appointment with ID:', appointment.id);
      console.log('Canceling appointment :', appointment);


      // const formattedDate = `${appointment.date.split("T")[0]}`;
      const formattedDate = format(new Date(appointment.date), 'yyyy-MM-dd HH:mm:ss');
      const response = await AppointmentService.updateAppointment({
        ...appointment,
        doctorId: appointment.doctor.id,
        appointmentType: 'CANCELED',
        date: formattedDate,
      });

      if (response) {
        console.log('Appointment canceled successfully');
        if (user.roles[0].name === "role_user") {
          fetchAppointmentsForPatient(user.id);
        } else if (user.roles[0].name === "role_doctor") {
          fetchAppointmentsForDoctor(user.id);
        }
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
        <DialogContent dividers={true} sx={{ maxHeight: '80vh' }}>
          {selectedAppointments.length > 0 ? (
            <List>
              {selectedAppointments.map((appointment) => (
                <Box key={appointment.id} sx={{ p: 1, mb: 2, borderBottom: '1px solid #ccc' }}>
                  <Typography
                    sx={{
                      fontSize: "3.5rem",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    Programare {appointment.appointmentType}
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
                    {appointment.title}
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
                  <Typography variant="h4">{appointment.date.split("T")[0]}</Typography>
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
                  <Typography variant="h4">{getFormattedTime(appointment.date)}</Typography>
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
                    {appointment.location}
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
                    {appointment.specialization}
                  </Typography>
                  <Divider />
                  {(user.roles[0].name === "role_user") && (
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
                      <Typography variant="h4">{appointment.doctor.firstName + " " + appointment.doctor.lastName}</Typography>
                    </>
                  )}
                  {(user.roles[0].name === "role_doctor") && (
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
                      <Typography variant="h4">{appointment.patient.firstName+" "+appointment.patient.lastName}</Typography>
                    </>
                  )}
                  <Divider />
                  <StyledButton
                    onClick={() => handleModifyAppointment(appointment)}
                    color="primary"
                    sx={{
                      fontSize: "1.5rem",
                      mt: 4,
                      ml:26,
                    }}
                  >
                    Modifica Programare
                  </StyledButton>

                  <StyledButton

                    onClick={()=>handleCancelAppointment(appointment)}
                    color="secondary"
                    sx={{
                    fontSize: "1.5rem",
                    mt: 4,
                    ml: 3,
                  }}
                    >
                    Anuleaza Programare
                </StyledButton>
                </Box>
              ))}
            </List>
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
          {showNewAppointmentButton && (user.roles[0].name === "role_admin" || user.roles[0].name === "role_user") && (
            <StyledButton
              onClick={handleNewAppointment}
              color="primary"
              sx={{
                fontSize: "1.5rem",
                mt:3,
              }}
            >
              Programare Nouă
            </StyledButton>
          )}
          <StyledButton
            onClick={handleClose}
            color="primary"
            sx={{
              fontSize: "1.5rem",
              mt:3,
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
