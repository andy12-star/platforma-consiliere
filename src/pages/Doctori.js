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
import DoctorService from "../services/doctor.service";


const Doctori = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [doctorsAll,setDoctorsAll] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await DoctorService.getDoctorsForPatient(user.id);
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    if (user?.id) {
      fetchDoctors();
    }
  }, [user]);


  useEffect(() => {
    const fetchALlDoctors = async () => {
      try {
        const dataALL = await DoctorService.getAllDoctors();
        setDoctorsAll(dataALL);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    if (user?.id) {
      fetchALlDoctors();
    }
  }, [user]);


  const handleDoctorClick = (doctor) => {

    console.log("doctor:");
    console.log(doctor);
    navigate(`/doctor-details/${doctor.id}`, { state: { doctor } });
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
                mt:3,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Lista Doctorilor
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


                  </TableRow>
                </TableHead>
                <TableBody>
                  {(user.roles[0].name==='role_user')&&(
                    <>
                      {doctors.map((doctor) => (
                        <TableRow
                          key={doctor.userId}
                          onClick={() => handleDoctorClick(doctor)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <Typography variant="h5">
                              {doctor.firstName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.lastName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.username}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.phoneNumber}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              {doctor.dateOfBirth}
                            </Typography>
                          </TableCell>

                        </TableRow>
                      ))}
                    </>
                  )}
                  {(user.roles[0].name==='role_admin')&&(
                    <>
                      {doctorsAll.map((doctor) => (
                        <TableRow
                          key={doctor.userId}
                          onClick={() => handleDoctorClick(doctor)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <Typography variant="h5">
                              {doctor.firstName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.lastName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.username}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">{doctor.phoneNumber}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              {doctor.dateOfBirth}
                            </Typography>
                          </TableCell>

                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default Doctori;
