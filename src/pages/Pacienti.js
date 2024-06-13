import React from "react";
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

const patients = [
  {
    firstName: "Ion",
    lastName: "Popescu",
    email: "ion.popescu@example.com",
    phone: "1234567890",
    birthDate: "1990-04-07",
    faculty: "Medicina Generala",
    userId: "001",
  },
  {
    firstName: "Maria",
    lastName: "Ionescu",
    email: "maria.ionescu@example.com",
    phone: "0987654321",
    birthDate: "1985-06-15",
    faculty: "Pediatrie",
    userId: "002",
  },
];

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

const Pacienti = () => {
  const navigate = useNavigate();

  const handlePatientClick = (patient) => {
    navigate(`/patient-details/${patient.userId}`, { state: { patient } });
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
                        Varsta
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
                    <TableCell>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Times New Roman, Times, serif",
                        }}
                      >
                        Cod utilizator
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
                        <Typography variant="h5">{patient.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">
                          {calculateAge(patient.birthDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.faculty}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{patient.userId}</Typography>
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
