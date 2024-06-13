import PageNav from "../components/PageNav";
import styles from "./mainPages.module.css";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import AuthService from "../services/AuthService";

function Contact() {
  // const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleContactSubmit = async (values, actions) => {
    try {
      await AuthService.contact(values);
      actions.setSubmitting(false);
      window.location.reload();
    } catch (error) {
      actions.setFieldError(
        "general",
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className={styles.mainPage}>
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
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleContactSubmit}
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
                      marginTop: "9em",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Ia legatura cu noi!
                  </Typography>
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Nume Prenume"
                    id="name"
                    name="name"
                    type="text"
                    error={Boolean(props.touched.name && props.errors.name)}
                    helperText={props.touched.name && props.errors.name}
                    value={props.values.name}
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
                    type="email"
                    error={Boolean(props.touched.email && props.errors.email)}
                    helperText={props.touched.email && props.errors.email}
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Mesaj"
                    id="message"
                    name="message"
                    type="text"
                    multiline
                    rows={4}
                    error={Boolean(
                      props.touched.message && props.errors.message
                    )}
                    helperText={props.touched.message && props.errors.message}
                    value={props.values.message}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <StyledButton
                    onClick={() => {
                      alert("Mesajul a fost trimis");
                    }}
                  >
                    Submit
                  </StyledButton>
                  {props.errors.general && (
                    <Typography
                      variant="body2"
                      style={{ color: "red", marginTop: "1em" }}
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100px"
      >
        <StyledButton
          sx={{
            backgroundColor: "#ffffff",
            // link catre chat anonim
          }}
        >
          Contact Anonim
        </StyledButton>
      </Box>
    </main>
  );
}

export default Contact;

/* import PageNav from "../components/PageNav";
import styles from "./mainPages.module.css";
import * as React from "react";
import { Button, Box } from "@mui/material";

import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <main className={styles.mainPage}>
      <PageNav />
      <ContactForm />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100px"
      >
        <Button variant="contained" size="large">
          Contact anonim
        </Button>
      </Box>
    </main>
  );
}

export default Contact; */
