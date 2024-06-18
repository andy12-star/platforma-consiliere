import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledTextField, StyledButton } from "../components/styledComp";
import styles from "./mainPages.module.css";
import { Container } from "@mui/system";
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";

function Programare() {
  const { user } = useAuth();

  const validationSchema = Yup.object({
    specialization: Yup.string().required("Specialization is required"),
    doctor: Yup.string().required("Doctor is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.string().required("Date is required"),
    hour: Yup.string().required("Preferred hour is required"),
  });

  const handleAppointment = async (values, actions) => {
    const newAppointment = {
      userId: user.id,
      specialization: values.specialization,
      doctor: values.doctor,
      location: values.location,
      date: values.date,
      hour: values.hour,
    };

    try {
      await AppointmentService.addAppointment(newAppointment);
    } catch (error) {
      console.error("Failed to add appointment", error);
      actions.setFieldError("general", "Failed to schedule appointment");
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
            Programare Medicală
          </Typography>
          <Formik
            initialValues={{
              specialization: "",
              doctor: "",
              location: "",
              date: "",
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
                    value={props.values.specialization}
                    onChange={props.handleChange}
                    error={
                      props.touched.specialization &&
                      Boolean(props.errors.specialization)
                    }
                  >
                    <MenuItem value={"Consiliere educationala"}>
                      Consiliere educationala
                    </MenuItem>
                    <MenuItem value={"Consiliere profesionala"}>
                      Consiliere profesionala
                    </MenuItem>
                    <MenuItem value={"Consiliere psihologica"}>
                      Consiliere psihologica
                    </MenuItem>
                    <MenuItem value={"terapie online"}>Terapie online</MenuItem>
                    <MenuItem value={"Life Coaching"}>Life Coaching</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="doctor"
                  name="doctor"
                  label="Doctor"
                  value={props.values.doctor}
                  onChange={props.handleChange}
                  error={props.touched.doctor && Boolean(props.errors.doctor)}
                  helperText={props.touched.doctor && props.errors.doctor}
                  margin="normal"
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="location"
                  name="location"
                  label="Locatie"
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
                  label="Data programare"
                  type="date"
                  value={props.values.date}
                  onChange={props.handleChange}
                  error={props.touched.date && Boolean(props.errors.date)}
                  helperText={props.touched.date && props.errors.date}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="hour"
                  name="hour"
                  label="Ora preferata"
                  type="time"
                  value={props.values.hour}
                  onChange={props.handleChange}
                  error={props.touched.hour && Boolean(props.errors.hour)}
                  helperText={props.touched.hour && props.errors.hour}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
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
