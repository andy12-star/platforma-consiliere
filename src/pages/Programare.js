import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledButton, StyledTextField } from "../components/styledComp";
import styles from "./mainPages.module.css";
import { Container } from "@mui/system";
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";
import DoctorService from "../services/doctor.service";
import { useLocation } from "react-router-dom";

const hourIntervals = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

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

function Programare() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "";

  const fetchDoctors = async () => {
    try {
      const fetchedDoctors = await DoctorService.getAllDoctors();
      console.log("Doctors fetched: ", fetchedDoctors)
      setDoctors(fetchedDoctors)
    } catch (error) {
      console.log("Could not fetch doctors from the database");
      throw error;
    }
  };

  const fetchDoctorAppointments = async (doctorId, date) => {
    try {
      const appointments = await AppointmentService.getAppointmentsForDoctorAndDate(doctorId, date);
      setDoctorAppointments(appointments);
    } catch (error) {
      console.error("Failed to fetch doctor's appointments", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const validationSchema = Yup.object({
    specialization: Yup.string().required("Specialization is required"),
    doctor: Yup.string().required("Doctor is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.string().required("Date is required"),
    hour: Yup.string().required("Preferred hour is required"),
  });

  const handleAppointment = async (values, actions) => {
    const appointmentDate = new Date(values.date);
    if (isHoliday(appointmentDate) || appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
      alert("Clinica este închisă în această dată. Vă rugăm să selectați o altă dată.");
      return;
    }

    const conflictingAppointment = doctorAppointments.some(appointment =>
      appointment.hour === values.hour && appointment.date === values.date
    );

    if (conflictingAppointment) {
      alert("Există deja o programare la această oră. Vă rugăm să selectați o altă oră.");
      return;
    }

    const appointmentDateTime = `${values.date} ${values.hour}:00`;

    console.log("form values: ", values);

    const newAppointment = {
      patientId: user.id,
      doctorId: values.doctor,
      appointmentType: 'UNCONFIRMED',
      specialization: values.specialization,
      date: appointmentDateTime,
      location: values.location,
    };

    try {
      await AppointmentService.saveAppointment(newAppointment);
      alert("Programarea a fost trimisa");
    } catch (error) {
      console.error("Failed to add appointment", error);
      actions.setFieldError("general", "Failed to schedule appointment");
    }
  };

  const handleDoctorChange = async (e, props) => {
    props.handleChange(e);
    const doctorId = e.target.value;
    const date = props.values.date;
    if (doctorId && date) {
      await fetchDoctorAppointments(doctorId, date);
    }
  };

  const handleDateChange = async (e, props) => {
    props.handleChange(e);
    const date = e.target.value;
    const doctorId = props.values.doctor;
    if (doctorId && date) {
      await fetchDoctorAppointments(doctorId, date);
    }
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
          textAlign="center"
          sx={{
            ml: 25,
            mt: 15,
            bgcolor: "#F0808040",
            padding: 10,
            borderRadius: 10,
            width: "85%",
            maxWidth: 700,
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Programare Medicală
          </Typography>
          <Formik
            initialValues={{
              specialization: "",
              doctor: "",
              location: "",
              date: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : "",
              hour: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAppointment}
          >
            {(props) => (
              <Form>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="specialization-label">
                    Specializare
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="specialization-label"
                    id="specialization"
                    name="specialization"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    value={props.values.specialization}
                    onChange={props.handleChange}
                    error={
                      props.touched.specialization &&
                      Boolean(props.errors.specialization)
                    }
                  >
                    <MenuItem value={"Consiliere educationala"} sx={{ fontSize: "1.5rem" }}>
                      Consiliere educationala
                    </MenuItem>
                    <MenuItem value={"Consiliere profesionala"} sx={{ fontSize: "1.5rem" }}>
                      Consiliere profesionala
                    </MenuItem>
                    <MenuItem value={"Consiliere psihologica"} sx={{ fontSize: "1.5rem" }}>
                      Consiliere psihologica
                    </MenuItem>
                    <MenuItem value={"terapie online"} sx={{ fontSize: "1.5rem" }}>
                      Terapie online
                    </MenuItem>
                    <MenuItem value={"Life Coaching"} sx={{ fontSize: "1.5rem" }}>
                      Life Coaching
                    </MenuItem>
                  </Field>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="doctor-label">Doctor</InputLabel>
                  <Field
                    as={Select}
                    labelId="doctor-label"
                    id="doctor"
                    name="doctor"
                    value={props.values.doctor}
                    onChange={(e) => handleDoctorChange(e, props)}
                    error={props.touched.doctor && Boolean(props.errors.doctor)}
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id} sx={{ fontSize: "1.5rem" }}>
                        {doctor.firstName + " " + doctor.lastName}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>

                <Field
                  as={StyledTextField}
                  fullWidth
                  id="location"
                  name="location"
                  label="Locatie"
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  value={props.values.location}
                  onChange={props.handleChange}
                  error={
                    props.touched.location && Boolean(props.errors.location)
                  }
                  helperText={props.touched.location && props.errors.location}
                  margin="normal"
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="date"
                  name="date"
                  label="Data"
                  type="date"
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  value={props.values.date}
                  onChange={(e) => handleDateChange(e, props)}
                  error={props.touched.date && Boolean(props.errors.date)}
                  helperText={props.touched.date && props.errors.date}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "1.5rem" }
                  }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="hour-label">Ora preferata</InputLabel>
                  <Field
                    as={Select}
                    labelId="hour-label"
                    id="hour"
                    name="hour"
                    value={props.values.hour}
                    onChange={props.handleChange}
                    error={props.touched.hour && Boolean(props.errors.hour)}
                  >
                    {hourIntervals.map((hour) => (
                      <MenuItem key={hour} value={hour} sx={{ fontSize: "1.5rem" }}>
                        {hour}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
                  Submit
                </StyledButton>
                {props.errors.general && (
                  <Typography
                    variant="body2"
                    style={{
                      color: "red",
                      marginTop: "1em",
                      fontSize: "1.5rem",
                    }}
                  >
                    {props.errors.general}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </main>
  );
}

export default Programare;

