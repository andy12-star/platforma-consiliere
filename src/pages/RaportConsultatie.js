import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import UserNav from "../components/UserNav";
import ConsultCard from "../components/ConsultCard";
import styles from "./mainPages.module.css";

const appointments = [
  {
    doctor: "Dr. Bendu Domnica",
    specialty: "Medicina Generala",
    date: "08 Mai 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Hipertensiune arteriala",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Prof. Univ. Dr. Sidenco Luminita Elena",
    specialty: "Recuperare Medicala",
    date: "26 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Tendinita patelei Periartrita genunchi",
    year: 2023,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Dr. Bendu Domnica",
    specialty: "Medicina Generala",
    date: "15 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Alte examinari generale",
    year: 2023,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Prof. Univ. Dr. Sidenco Luminita Elena",
    specialty: "Recuperare Medicala",
    date: "09 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Tendinita patelei Periartrita genunchi",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Dr. Bendu Domnica",
    specialty: "Medicina Generala",
    date: "15 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Alte examinari generale",
    year: 2023,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Prof. Univ. Dr. Sidenco Luminita Elena",
    specialty: "Recuperare Medicala",
    date: "09 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Tendinita patelei Periartrita genunchi",
    year: 2022,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Dr. Bendu Domnica",
    specialty: "Medicina Generala",
    date: "15 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Alte examinari generale",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Prof. Univ. Dr. Sidenco Luminita Elena",
    specialty: "Recuperare Medicala",
    date: "09 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Tendinita patelei Periartrita genunchi",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Dr. Bendu Domnica",
    specialty: "Medicina Generala",
    date: "15 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Alte examinari generale",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
  {
    doctor: "Prof. Univ. Dr. Sidenco Luminita Elena",
    specialty: "Recuperare Medicala",
    date: "09 Apr 2024",
    location: "Bucuresti Floreasca",
    diagnosis: "Tendinita patelei Periartrita genunchi",
    year: 2024,
    details: {
      trimisDe: "Bendu Domnica",
      servicii: "Interpretare Analize",
      simptome: "reflux g-e",
      clinice: "G=92Kg, I=1,82m",
      paraclinice: "hipercolest, S urina modif",
      diagnostic: "Hipertensiune arteriala",
    },
  },
];

const groupAppointmentsByYear = (appointments) => {
  return appointments.reduce((groups, appointment) => {
    const year = appointment.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(appointment);
    return groups;
  }, {});
};

const RaportConsultatie = () => {
  const groupedAppointments = groupAppointmentsByYear(appointments);
  const sortedYears = Object.keys(groupedAppointments).sort((a, b) => b - a);

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
                {groupedAppointments[year].map((appointment, index) => (
                  <Grid item xs={10} sm={6} md={7} lg={3} key={index}>
                    <ConsultCard {...appointment} />
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
