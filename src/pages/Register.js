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
    clientFaculty: Yup.string().required("This field is required"),
    clientPassword: Yup.string().required("This field is required"),
  });

  const handleRegister = async (e, values) => {
    const registerValues = {
      clientFirstName: values.clientFirstName,
      clientLastName: values.clientLastName,
      clientEmail: values.clientEmail,
      clientPhoneNr: values.clientPhoneNr,
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
        minHeight="50vh"
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 10,
            margin: 5,
            width: 800,
            textAlign: "center",
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
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Nume"
                    id="outlined-required"
                    name="clientFirstName"
                    type="text"
                    error={Boolean(
                      props.touched.clientFirstName &&
                        props.errors.clientFirstName
                    )}
                    helperText={
                      props.touched.clientFirstName &&
                      props.errors.clientFirstName
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
                    error={Boolean(
                      props.touched.clientLastName &&
                        props.errors.clientLastName
                    )}
                    helperText={
                      props.touched.clientLastName &&
                      props.errors.clientLastName
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
                    error={Boolean(
                      props.touched.clientEmail && props.errors.clientEmail
                    )}
                    helperText={
                      props.touched.clientEmail && props.errors.clientEmail
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
                    error={Boolean(
                      props.touched.clientPhoneNr && props.errors.clientPhoneNr
                    )}
                    value={props.values.clientPhoneNr}
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
                    error={Boolean(
                      props.touched.clientFaculty && props.errors.clientFaculty
                    )}
                    value={props.values.clientFaculty}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Parola"
                    id="password"
                    name="clientPassword"
                    type="text"
                    error={Boolean(
                      props.touched.clientPassword &&
                        props.errors.clientPassword
                    )}
                    value={props.values.clientPassword}
                    onChange={props.handleChange}
                  />
                  <StyledButton type="submit" onClick={handleRegister}>
                    Submit
                  </StyledButton>
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
/* import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import AuthService from "../services/AuthService";

function Register() {
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
    clientPassword: Yup.string().required("This field is required"),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    const registerValues = {
      clientFirstName: values.clientFirstName,
      clientLastName: values.clientLastName,
      clientEmail: values.clientEmail,
      clientPhoneNr: values.clientPhoneNr,
      clientPassword: values.clientPassword,
    };
    try {
      await AuthService.register(registerValues);
      localStorage.setItem("userData", JSON.stringify(registerValues));
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 10,
            margin: 5,
            width: 800,
            textAlign: "center",
          }}
        >
          <Formik
            initialValues={{
              clientFirstName: '',
              clientLastName: '',
              clientEmail: '',
              clientPhoneNr: '',
              clientPassword: ''
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
                    variant="h4"
                    style={{
                      marginTop: "1em",
                      fontFamily: "Manrope",
                      color: "#15171c",
                    }}
                  >
                    Introdu datele pentru inregistrare:
                  </Typography>
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="First Name"
                    id="outlined-required"
                    name="clientFirstName"
                    type="text"
                    error={Boolean(
                      props.touched.clientFirstName &&
                        props.errors.clientFirstName
                    )}
                    helperText={
                      props.touched.clientFirstName &&
                      props.errors.clientFirstName
                    }
                    value={props.values.clientFirstName}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Last Name"
                    id="name-input-last"
                    name="clientLastName"
                    type="text"
                    error={Boolean(
                      props.touched.clientLastName &&
                        props.errors.clientLastName
                    )}
                    helperText={
                      props.touched.clientLastName &&
                      props.errors.clientLastName
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
                    error={Boolean(
                      props.touched.clientEmail && props.errors.clientEmail
                    )}
                    helperText={
                      props.touched.clientEmail && props.errors.clientEmail
                    }
                    value={props.values.clientEmail}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Phone Number"
                    id="phone-input"
                    name="clientPhoneNr"
                    type="text"
                    error={Boolean(
                      props.touched.clientPhoneNr && props.errors.clientPhoneNr
                    )}
                    value={props.values.clientPhoneNr}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Password"
                    id="password"
                    name="clientPassword"
                    type="password"
                    error={Boolean(
                      props.touched.clientPassword &&
                        props.errors.clientPassword
                    )}
                    value={props.values.clientPassword}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <StyledButton type="submit">
                    Submit
                  </StyledButton>
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
*/
