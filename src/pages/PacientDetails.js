import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Grid } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import ConsultCard from "../components/ConsultCard";
import consultationServiceInstance from "../services/consultation.service";

const PacientDetails = () => {
  const location = useLocation();
  const { patient } = location.state;
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {

    const fetchConsultations = async () => {
      try {
        console.log("consulatii");
        console.log(patient);
        const data = await consultationServiceInstance.getConsultationForPatientId(patient.id);
        setConsultations(data);

      } catch (error) {
        console.error("Failed to fetch consultations", error);
      }
    };

    if (patient?.id) {
      fetchConsultations();
    }
  }, [patient]);

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
            sx={{
              minHeight: "92vh",
              bgcolor: "#ffff",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 2 }}>
              Date personale
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{
                mb: 3,
                minHeight: "15vh",
                width: "60vh",
                bgcolor: "#F0808040",
                padding: 3,
                borderRadius: 2,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h4" sx={{ mt: 1 }}>
                Nume: {patient.firstName} {patient.lastName}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>
                Data nașterii: {patient.birthDate}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Facultate: {patient.faculty}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Telefon: {patient.phoneNumber}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Email: {patient.username}</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 3 }}>
              Dosar Medical
            </Typography>
            <Container maxWidth="xxl" sx={{ ml: 9 }}>
              <Grid container spacing={2}>
                {consultations.map((consultation) => (
                  <Grid item xs={20} sm={2} md={2} lg={5.5} key={consultation.id}>
                    <ConsultCard {...consultation} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default PacientDetails;
