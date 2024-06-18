import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../services/context/AuthContext";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import AuthService from "../services/AuthService";

function Register() {
  // const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    clientFirstName: Yup.string().required("This field is required"),
    clientLastName: Yup.string().required("This field is required"),
    clientEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    clientPhoneNr: Yup.string()
      .min(10, "Phone number too short")
      .max(10, "Phone number too long")
      .required("Invalid phone format"),
    clientDateOfBirth:Yup.string().required("This field is required"),
    clientFaculty: Yup.string().required("This field is required"),
    clientPassword: Yup.string().required("This field is required"),
  });

  const handleRegister = async (e, values) => {
    const registerValues = {
      clientFirstName: values.clientFirstName,
      clientLastName: values.clientLastName,
      clientEmail: values.clientEmail,
      clientPhoneNr: values.clientPhoneNr,
      clientDateOfBirth: values.clientDateOfBirth,
      clientPassword: values.clientPassword,
      clientFaculty: values.clientFaculty,
    };
    e.preventDefault();
    try {
      await AuthService.register(registerValues);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
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
            initialValues={{}}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {(props) => (
              <Form noValidate onSubmit={props.handleRegister} className="form">
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  spacing={5}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      marginTop: "9em",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Introdu datele inregistrare{" "}
                  </Typography>

                  <Field
                    sx={{ width: 400, fontSize: "1.5rem" }}
                    as={StyledTextField}
                    required
                    label="Nume"
                    id="outlined-required"
                    name="clientFirstName"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientFirstName &&
                        props.errors.clientFirstName
                    )}
                    helperText={
                      props.touched.clientFirstName &&
                      props.errors.clientFirstName ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientFirstName}
                        </span>
                      ) : null
                    }
                    value={props.values.clientFirstName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Prenume"
                    id="name-input-last"
                    name="clientLastName"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientLastName &&
                        props.errors.clientLastName
                    )}
                    helperText={
                      props.touched.clientLastName &&
                      props.errors.clientLastName ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientLastName}
                        </span>
                      ) : null
                    }
                    value={props.values.clientLastName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Email"
                    id="email-input"
                    name="clientEmail"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientEmail && props.errors.clientEmail
                    )}
                    helperText={
                      props.touched.clientEmail && props.errors.clientEmail ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientEmail}
                        </span>
                      ) : null
                    }
                    value={props.values.clientEmail}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Numar de telefon"
                    id="phone-input"
                    name="clientPhoneNr"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientPhoneNr && props.errors.clientPhoneNr
                    )}
                    helperText={
                      props.touched.clientPhoneNr &&
                      props.errors.clientPhoneNr ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientPhoneNr}
                        </span>
                      ) : null
                    }
                    value={props.values.clientPhoneNr}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Facultate"
                    id="fac-input"
                    name="clientFaculty"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientFaculty && props.errors.clientFaculty
                    )}
                    helperText={
                      props.touched.clientFaculty &&
                      props.errors.clientFaculty ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientFaculty}
                        </span>
                      ) : null
                    }
                    value={props.values.clientFaculty}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  /><Field
                  sx={{ width: 400 }}
                  as={StyledTextField}
                  required
                  label="Data Nasterii"
                  id="fac-input"
                  name="datOfBirth"
                  type="text"
                  InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                  InputProps={{ style: { fontSize: "1.5rem" } }}
                  error={Boolean(
                    props.touched.datOfBirth && props.errors.datOfBirth
                  )}
                  helperText={
                    props.touched.datOfBirth &&
                    props.errors.datOfBirth ? (
                      <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.datOfBirth}
                        </span>
                    ) : null
                  }
                  value={props.values.datOfBirth}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Parola"
                    id="password"
                    name="clientPassword"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.clientPassword &&
                        props.errors.clientPassword
                    )}
                    helperText={
                      props.touched.clientPassword &&
                      props.errors.clientPassword ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.clientPassword}
                        </span>
                      ) : null
                    }
                    value={props.values.clientPassword}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <StyledButton type="submit">Submit</StyledButton>
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
