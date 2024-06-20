import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import { useAuth } from "../services/context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .min(10, "Phone number too short")
      .max(10, "Phone number too long")
      .required("Invalid phone format"),
    dateOfBirth: Yup.string().required("This field is required"),
    faculty: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const { register } = useAuth();

  const handleRegister = async (values, actions) => {
    const registerValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      faculty: values.faculty,
      dateOfBirth: values.dateOfBirth,
      type: "USER",
    };
    try {
      console.log("Registering with values:", registerValues);
      await register(registerValues);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      actions.setFieldError("general", "Registration failed");
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 10,
            margin: 5,
            width: 800,
            textAlign: "center",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              dateOfBirth: "",
              faculty: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {(props) => (
              <Form noValidate className="form">
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  spacing={5}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      marginTop: "2em",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Introdu datele pentru înregistrare
                  </Typography>
                  <Field
                    sx={{ width: 400, fontSize: "1.5rem" }}
                    as={StyledTextField}
                    required
                    label="Nume"
                    id="firstName"
                    name="firstName"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.firstName && props.errors.firstName
                    )}
                    helperText={
                      props.touched.firstName && props.errors.firstName ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.firstName}
                        </span>
                      ) : null
                    }
                    value={props.values.firstName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Prenume"
                    id="lastName"
                    name="lastName"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.lastName && props.errors.lastName)}
                    helperText={
                      props.touched.lastName && props.errors.lastName ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.lastName}
                        </span>
                      ) : null
                    }
                    value={props.values.lastName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Email"
                    id="email"
                    name="email"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.email && props.errors.email)}
                    helperText={
                      props.touched.email && props.errors.email ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.email}
                        </span>
                      ) : null
                    }
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Numar de telefon"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.phoneNumber && props.errors.phoneNumber)}
                    helperText={
                      props.touched.phoneNumber && props.errors.phoneNumber ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.phoneNumber}
                        </span>
                      ) : null
                    }
                    value={props.values.phoneNumber}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Facultate"
                    id="faculty"
                    name="faculty"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.faculty && props.errors.faculty)}
                    helperText={
                      props.touched.faculty && props.errors.faculty ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.faculty}
                        </span>
                      ) : null
                    }
                    value={props.values.faculty}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Data Nasterii"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.dateOfBirth && props.errors.dateOfBirth)}
                    helperText={
                      props.touched.dateOfBirth && props.errors.dateOfBirth ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.dateOfBirth}
                        </span>
                      ) : null
                    }
                    value={props.values.dateOfBirth}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Parola"
                    id="password"
                    name="password"
                    type="password"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.password && props.errors.password)}
                    helperText={
                      props.touched.password && props.errors.password ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.password}
                        </span>
                      ) : null
                    }
                    value={props.values.password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
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
                  <StyledButton
                    type="submit"
                    variant="contained"
                    sx={{ fontSize: "1.5rem", padding: "1em 2em" }}
                  >
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
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </main>
  );
}

export default Register;


