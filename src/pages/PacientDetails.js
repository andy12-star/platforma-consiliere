import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Grid } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import ConsultCard from "../components/ConsultCard";
import consultationServiceInstance from "../services/consultation.service";
import {useAuth} from "../services/context/AuthContext";

const PacientDetails = () => {
  const location = useLocation();
  const { patient } = location.state;
  const [consultations, setConsultations] = useState([]);
  const [consultationsAll, setConsultationsAll] = useState([]);

  const {user}=useAuth();

  const fetchAllConsultations = async () => {
    try {

      const data = await consultationServiceInstance.getConsultationForPatientId(patient.id);
      setConsultationsAll(data);
      console.log("consulatii");
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch consultations", error);
    }
  };

  useEffect( ()=>{
    fetchAllConsultations();
  },[]);

  const fetchConsultations = async () => {
    try {

      const data = await consultationServiceInstance.getConsultationsForDoctorByPatient(user.id,patient.id);
      setConsultations(data);
      console.log("consulatii");
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch consultations", error);
    }
  };

  useEffect( ()=>{
    fetchConsultations();
  },[]);

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
              mt: 6,
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
                Data nașterii: {patient.dateOfBirth}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Facultate: {patient.faculty}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Telefon: {patient.phoneNumber}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Email: {patient.username}</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 3 }}>
              Dosar Medical
            </Typography>
            <Container maxWidth="xxl" sx={{ ml: 9 }}>
              {(user.roles[0].name==='role_doctor')&&(
                <>
                  <Grid container spacing={2}>
                    {consultations.map((consultation) => (
                      <Grid item xs={20} sm={2} md={2} lg={5.5} key={consultation.id}>
                        <ConsultCard {...consultation} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              {(user.roles[0].name==='role_admin')&&(
                <>
                  <Grid container spacing={2}>
                    {consultationsAll.map((consultation) => (
                      <Grid item xs={20} sm={2} md={2} lg={5.5} key={consultation.id}>
                        <ConsultCard {...consultation} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

            </Container>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default PacientDetails;
