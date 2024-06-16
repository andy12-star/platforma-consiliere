import React, { useState, useEffect } from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";

const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData")) || {};
};

const Profil = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <section2>
        <Container>
          <Typography
            variant="h2"
            marginBottom={2}
            sx={{
              mt: 6,
              ml: 61,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Profil
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            marginTop={4}
            textAlign="left"
            sx={{
              minHeight: "55vh",
              p: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Nume: {userData.clientFirstName || "N/A"}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Prenume: {userData.clientLastName || "N/A"}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Data nașterii: {userData.dataNasterii || "N/A"}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Adresa de mail: {userData.clientEmail || "N/A"}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Numar de telefon: {userData.clientPhoneNr || "N/A"}
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              textAlign="left"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Facultate: {userData.facultate || "N/A"}
            </Typography>
            <Divider />
          </Box>
        </Container>
      </section2>
    </main>
  );
};

export default Profil;
