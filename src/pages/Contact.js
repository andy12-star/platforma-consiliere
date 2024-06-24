import PageNav from "../components/PageNav";
import styles from "./mainPages.module.css";
import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import ContactService from "../services/contact.service";

function Contact() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleContactSubmit = async (values, actions) => {
    try {
      console.log("values: ", values);
      await ContactService.contact(values);
      actions.setSubmitting(false);
      alert("Mesajul a fost trimis");
      actions.resetForm();
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
        minHeight="80vh"
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 10,
            margin: 5,
            width: 800,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
                      marginTop: "2em",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                      fontSize: "3rem",
                    }}
                  >
                    Ia legatura cu noi!
                  </Typography>
                  <Field
                    sx={{ width: 500, fontSize: "3rem" }}
                    as={StyledTextField}
                    required
                    label="Nume"
                    id="name"
                    name="name"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(props.touched.name && props.errors.name)}
                    helperText={
                      props.touched.name && props.errors.name ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.name}
                        </span>
                      ) : null
                    }
                    value={props.values.name}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 500 }}
                    as={StyledTextField}
                    required
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
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
                    sx={{ width: 500 }}
                    as={StyledTextField}
                    required
                    label="Mesaj"
                    id="message"
                    name="message"
                    type="text"
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.message && props.errors.message
                    )}
                    helperText={
                      props.touched.message && props.errors.message ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.message}
                        </span>
                      ) : null
                    }
                    value={props.values.message}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50px"
      >

      </Box>
    </main>
  );
}

export default Contact;
