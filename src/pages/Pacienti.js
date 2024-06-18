import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import { useAuth } from "../services/context/AuthContext";
import PatientService from "../services/patient.service";


const Pacienti = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await PatientService.getPatientsForDoctor(user.id);
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };

    if (user?.id) {
      fetchPatients();
    }
  }, [user]);


  const handlePatientClick = (patient) => {

    console.log("pacient:");
    console.log(patient);
    navigate(`/patient-details/${patient.id}`, { state: { patient } });
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
        <Container maxWidth="xl">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={4}
          >
            <Typography
              variant="h2"
              marginBottom={2}
              sx={{
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Lista Pacienților
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table
                sx={{ minWidth: 650, height: 200 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Nume
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Prenume
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Numar de telefon
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Data de nastere
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Facultate
                      </Typography>
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow
                      key={patient.userId}
                      onClick={() => handlePatientClick(patient)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Typography variant="h5">
                          {patient.firstName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.lastName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.username}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.phoneNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">
                          {patient.dateOfBirth}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.faculty}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default Pacienti;
