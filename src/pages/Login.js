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
      await AuthService.login(values.username, values.password);
      navigate("/overview"); // aici sa se duca pt pacient/medic
      window.location.reload();
    } catch (error) {
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
                      marginTop: "9em",
                      fontWeight: "bold",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Introdu datele pentru a te loga
                  </Typography>
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Username"
                    id="username"
                    name="username"
                    type="text"
                    error={Boolean(
                      props.touched.username && props.errors.username
                    )}
                    helperText={props.touched.username && props.errors.username}
                    value={props.values.username}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <Field
                    sx={{ width: 400 }}
                    as={StyledTextField}
                    required
                    label="Parola"
                    id="password"
                    name="password"
                    type="password"
                    error={Boolean(
                      props.touched.password && props.errors.password
                    )}
                    helperText={props.touched.password && props.errors.password}
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                  />
                  <StyledButton onClick={handleLogin}>Log in</StyledButton>
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
    </main>
  );
}

export default Login;

/* import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AuthService from "../services/AuthService";

export default function Login() {
  const [username, setUsername] = useState("username client");
  const [password, setPassword] = useState("client");
  const [message, setMessage] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setUsernameErr(false);
    setPasswordErr(false);
    setLoginErr(false);

    await AuthService.login(username, password).then(
      () => {
        Navigate("/verificare");
        window.location.reload();
      },
      () => {
        setMessage("Username sau parola gresite");
        setUsernameErr(true);
        setPasswordErr(true);
        setLoginErr(true);
      }
    );
  };

  const resetLoginErr = () => {
    if (loginErr) {
      setLoginErr(false);
      setUsernameErr(false);
      setPasswordErr(false);
    }
  };

  React.useEffect(() => {
    AuthService.logout();
  }, []);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
              resetLoginErr();
            }}
            error={usernameErr}
            value={username}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Parola</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              resetLoginErr();
            }}
            error={passwordErr}
            value={password}
          />
        </div>

        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Log in
        </Button>
        {loginErr && (
          <Typography
            variant="body2"
            style={{ color: "red", marginTop: "1em" }}
          >
            {message}
          </Typography>
        )}
      </form>
    </main>
  );
} */
