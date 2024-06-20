import React, { useState, useEffect } from "react";
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
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";

const RaportConsultatie = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const fetchAppointmentsForDoctor = async (doctorId) => {
    try {
      const appointmentsData = await AppointmentService.getAppointmentsForDoctor(doctorId);
      const honoredAppointments = appointmentsData.filter(appointment => appointment.appointmentType === "HONORED");
      setFilteredAppointments(honoredAppointments);
      console.log("Filtered Honored Appointments:", honoredAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchAppointmentsForDoctor(user.id);
    }
  }, [user]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = filteredAppointments.filter(
      (appointment) =>
        appointment.doctor.toLowerCase().includes(value) ||
        appointment.name.toLowerCase().includes(value)
    );
    setFilteredAppointments(filtered);
  };

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
          <Grid container spacing={2}>
            {filteredAppointments.map((appointment, index) => (
              <Grid item xs={10} sm={6} md={7} lg={3} key={index}>
                <RaportCard appointment={appointment} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default RaportConsultatie;
