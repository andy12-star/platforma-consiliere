import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserNav from "../components/UserNav";
import RaportCard from "../components/RaportCard";
import styles from "./mainPages.module.css";

const appointments = [
  {
    name: "Andreea Ionita",
    date: "09 Apr 2024",
    year: 2024,
  },
  {
    name: "Theo ciobanoiu",
    date: "09 Apr 2024",
    year: 2024,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.doctor.toLowerCase().includes(value.toLowerCase()) ||
        appointment.details?.trimisDe
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  const groupedAppointments = groupAppointmentsByYear(filteredAppointments);
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
          <Box display="flex" justifyContent="center" mb={4}>
            <Paper
              component="form"
              sx={{ display: "flex", alignItems: "center", width: 800 }}
            >
              <TextField
                fullWidth
                placeholder="CAUTA PACIENT..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Paper>
          </Box>
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
                    <RaportCard {...appointment} />
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
