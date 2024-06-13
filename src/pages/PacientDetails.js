import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";

const PacientDetails = () => {
  const location = useLocation();
  const { patient } = location.state;

  if (!patient) {
    return (
      <main className={styles.mainPage}>
        <UserNav />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{ minHeight: "92vh", p: 1 }}
        >
          <Container maxWidth="xl">
            <Typography
              variant="h2"
              marginBottom={2}
              sx={{
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Patient not found
            </Typography>
          </Container>
        </Box>
      </main>
    );
  }

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ minHeight: "92vh", bgcolor: "#E1EBEE", p: 1 }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            marginBottom={2}
            sx={{
              mt: 3,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            {patient.firstName} {patient.lastName}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            sx={{ minHeight: "92vh", bgcolor: "#ffff", p: 1 }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
              Date personale
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{
                minHeight: "30vh",
                width: "50vh",
                bgcolor: "#E1EBEE",
                p: 1,
              }}
            >
              <Typography variant="h4" sx={{ mt: 5 }}>
                Nume: {patient.firstName} {patient.lastName}
              </Typography>
              <Typography variant="h4">
                Vârstă: {calculateAge(patient.birthDate)}
              </Typography>
              <Typography variant="h4">Facultate: {patient.faculty}</Typography>
              <Typography variant="h4">Telefon: {patient.phone}</Typography>
              <Typography variant="h4">Email: {patient.email}</Typography>
              <Typography variant="h4">
                Cod utilizator: {patient.userId}
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
              Dosar Medical
            </Typography>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default PacientDetails;
