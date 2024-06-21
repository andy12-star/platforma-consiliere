import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import { StyledTextField, StyledButton } from "../components/styledComp";
import AppointmentService from "../services/appointment.service";
import {useAuth} from "../services/context/AuthContext";
import DoctorService from "../services/doctor.service";

const ModifyAppt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointment } = location.state;
  const{user}=useAuth();
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const fetchedDoctors = await DoctorService.getAllDoctors();
      console.log("Doctors fetched: ", fetchedDoctors)
      setDoctors(fetchedDoctors)
    } catch (error) {
      console.log("Could not fetch doctors from the database");
      throw error;
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

const handleSave = async (values, actions) => {
  const appointmentDateTime = `${values.date} ${values.hour}:00`;

  const updatedAppointment = {
    ...appointment,
    specialization: values.specialization,
    location: values.location,
    date: appointmentDateTime,
    doctorId: values.doctor,
  };
  console.log("Updated appt: ", updatedAppointment);
  try {
    await AppointmentService.updateAppointment(updatedAppointment);
    navigate("/programari");
  } catch (error) {
    console.error("Failed to update appointment", error);
    actions.setFieldError("general", "Failed to update appointment");
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
        minHeight="60vh"
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
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontFamily: "Times New Roman, Times, serif",
          }}
        >
          Modifica Programare
        </Typography>
        <Formik
          initialValues={{
            specialization: appointment.specialization || "",
            doctor: appointment.doctor?.id || "",
            location: appointment.location || "",
            date: appointment.date.split("T")[0],
            hour: appointment.date.split("T")[1].substring(0, 5),
          }}
          onSubmit={handleSave}
        >
          {(props) => (



            <Form>
              {(user.roles[0].name ==="role_user")&&(
                <>
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
                      InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                      InputProps={{ style: { fontSize: "1.5rem" } }}
                      value={props.values.doctor}
                      onChange={props.handleChange}
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
                onChange={props.handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: "1.5rem" },
                }}
              />
              <Field
                as={StyledTextField}
                fullWidth
                id="hour"
                name="hour"
                label="Ora preferata"
                type="time"
                InputProps={{ style: { fontSize: "1.5rem" } }}
                value={props.values.hour}
                onChange={props.handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: "1.5rem" },
                }}
              />
              </>
              )}
              {(user.roles[0].name ==="role_doctor")&&(
                <>
                  <Field
                    as={StyledTextField}
                    fullWidth
                    id="appointmentType"
                    name="appointmentType"
                    label="Statusul programarii"
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    value={props.values.appointmentType}
                    onChange={props.handleChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "1.5rem" },
                    }}
                  />
                </>)}
              <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
                Salvează Modificările
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
};

export default ModifyAppt;
