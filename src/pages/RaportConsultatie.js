import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import UserNav from "../components/UserNav";
import ConsultCard from "../components/ConsultCard";
import styles from "./mainPages.module.css";
import { useAuth } from "../services/context/AuthContext";
import ConsultationService from "../services/consultation.service";

const extractYearFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

const groupConsultationsByYear = (consultations) => {
  return consultations.reduce((groups, consultation) => {
    const year = extractYearFromDate(consultation.date);
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(consultation);
    return groups;
  }, {});
};

const RaportConsultatie = () => {

  const [consultations, setConsultations] = useState([]);
  const { user } = useAuth();


  const fetchConsultations = async () => {
    try {
      let consultationData;
      if (user.roles[0].name === 'role_user') {
        consultationData = await ConsultationService.getConsultationForPatientId(user.id);
      } else if (user.roles[0].name === 'role_doctor') {
        consultationData = await ConsultationService.getConsultationForDoctorId(user.id);
      }
      setConsultations(consultationData);
    } catch (error) {
      console.error("Failed to fetch consultations", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchConsultations();
    }
  }, [user]);

  const groupedConsultations = groupConsultationsByYear(consultations);
  const sortedYears = Object.keys(groupedConsultations).sort((a, b) => b - a);

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
        <Container maxWidth="xxl" sx={{ ml: 9 }}>
          <Typography
            variant="h2"
            alignItems="center"
            marginBottom={2}
            sx={{
              mt: 4,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Rapoarte Consultatii
          </Typography>
          {sortedYears.map((year) => (
            <Box key={year} marginBottom={4}>
              <Typography
                variant="h4"
                textAlign="left"
                gutterBottom
                sx={{
                  ml: 5,
                  fontSize: "3rem",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {year}
              </Typography>
              <Grid container spacing={2}>
                {groupedConsultations[year].map((consultation, index) => (
                  <Grid item xs={10} sm={6} md={7} lg={3} key={index}>
                    <ConsultCard {...consultation} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>
    </main>
  );
};

export default RaportConsultatie;
