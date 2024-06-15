import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTextField, StyledButton } from "../components/styledComp";
import AuthService from "../services/AuthService";

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, actions) => {
    try {
      console.log("Login values:");
      console.log(values.username + " " + values.password);
      await AuthService.login(values.username, values.password);
      navigate("/overview");
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
      actions.setFieldError("general", "Username or password is incorrect");
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
            padding: 5,
            width: 800,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
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
                    Introdu datele pentru a te loga
                  </Typography>
                  <Field
                    sx={{ width: 500, fontSize: "1.5rem" }}
                    as={StyledTextField}
                    required
                    label="Username"
                    id="username"
                    name="username"
                    type="text"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.username && props.errors.username
                    )}
                    helperText={
                      props.touched.username && props.errors.username ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.username}
                        </span>
                      ) : null
                    }
                    value={props.values.username}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 500, fontSize: "1.5rem" }}
                    as={StyledTextField}
                    required
                    label="Parola"
                    id="password"
                    name="password"
                    type="password"
                    InputLabelProps={{ style: { fontSize: "1.5rem" } }}
                    InputProps={{ style: { fontSize: "1.5rem" } }}
                    error={Boolean(
                      props.touched.password && props.errors.password
                    )}
                    helperText={
                      props.touched.password && props.errors.password ? (
                        <span style={{ fontSize: "1.5rem" }}>
                          {props.errors.password}
                        </span>
                      ) : null
                    }
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <StyledButton
                    type="submit"
                    sx={{ fontSize: "1.5rem", padding: "1em 2em" }}
                  >
                    Log in
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

export default Login;
