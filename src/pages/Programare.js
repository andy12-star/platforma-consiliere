import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, MenuItem, InputLabel, Select } from "@mui/material";
import UserNav from "../components/UserNav";
import {
  StyledTextField,
  StyledButton,
  StyledFormControl,
} from "../components/styledComp";
import styles from "./mainPages.module.css";
import { Container } from "@mui/system";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  specialization: Yup.string().required("Specialization is required"),
  doctor: Yup.string().required("Doctor is required"),
  appointmentDate: Yup.string().required("Date is required"),
  preferredHour: Yup.string().required("Preferred hour is required"),
});

function Programare() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      specialization: "",
      doctor: "",
      appointmentDate: "",
      preferredHour: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          textAlign="center"
          sx={{
            ml: 25,
            mt: 6,
            bgcolor: "#F0808040", // asta e culoarea cea mai buna
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
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <StyledTextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Nume"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
            />
            <StyledTextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Prenume"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
            />
            <StyledTextField
              fullWidth
              id="phone"
              name="phone"
              label="Numar de telefon"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              margin="normal"
            />
            <StyledFormControl fullWidth margin="normal">
              <InputLabel id="specialization-label">Specializare</InputLabel>
              <Select
                labelId="specialization-label"
                id="specialization"
                name="specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                error={
                  formik.touched.specialization &&
                  Boolean(formik.errors.specialization)
                }
              >
                <MenuItem value={"Hipnoterapie"}>Hipnoterapie</MenuItem>
                <MenuItem value={"Life Coaching"}>Life Coaching</MenuItem>
                <MenuItem value={"Psihoterapie online"}>
                  Psihoterapie online
                </MenuItem>
                <MenuItem value={"Consult"}>Consult</MenuItem>
                <MenuItem value={"Consiliere vocationala"}>
                  Consiliere vocationala
                </MenuItem>
              </Select>
            </StyledFormControl>
            <StyledTextField
              fullWidth
              id="doctor"
              name="doctor"
              label="Doctor"
              value={formik.values.doctor}
              onChange={formik.handleChange}
              error={formik.touched.doctor && Boolean(formik.errors.doctor)}
              helperText={formik.touched.doctor && formik.errors.doctor}
              margin="normal"
            />
            <StyledTextField
              fullWidth
              id="appointmentDate"
              name="appointmentDate"
              label="Data programare"
              type="date"
              value={formik.values.appointmentDate}
              onChange={formik.handleChange}
              error={
                formik.touched.appointmentDate &&
                Boolean(formik.errors.appointmentDate)
              }
              helperText={
                formik.touched.appointmentDate && formik.errors.appointmentDate
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <StyledTextField
              fullWidth
              id="preferredHour"
              name="preferredHour"
              label="Ora preferata"
              type="time"
              value={formik.values.preferredHour}
              onChange={formik.handleChange}
              error={
                formik.touched.preferredHour &&
                Boolean(formik.errors.preferredHour)
              }
              helperText={
                formik.touched.preferredHour && formik.errors.preferredHour
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
              Submit
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default Programare;
