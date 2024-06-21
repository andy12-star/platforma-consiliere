// import React, {useState, useEffect} from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   TextField,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import UserNav from "../components/UserNav";
// import RaportCard from "../components/RaportCard";
// import styles from "./mainPages.module.css";
// import {useAuth} from "../services/context/AuthContext";
// import ConsultationService from "../services/consultation.service";
//
// const RaportConsultatie = () => {
//   const {user} = useAuth();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [consultations, setConsultations] = useState([]);
//
//   const fetchConsultations = async () => {
//     try {
//       if (user.roles[0].name === 'role_user') {
//         const consultationData = await ConsultationService.getConsultationForPatientId(user.id);
//         setConsultations(consultationData);
//       } else if (user.roles[0].name === 'role_doctor') {
//         const consultationData = await ConsultationService.getConsultationForDoctorId(user.id);
//         setConsultations(consultationData);
//       }
//     } catch (error) {
//       console.error("Failed to doctor consultations", error);
//     }
//   }
//
//   useEffect(() => {
//     if (user && user.id) {
//       fetchConsultations()
//     }
//   }, [user]);
//
//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = filteredAppointments.filter(
//       (appointment) =>
//         appointment.doctor.toLowerCase().includes(value) ||
//         appointment.name.toLowerCase().includes(value)
//     );
//     setFilteredAppointments(filtered);
//   };
//
//   return (
//     <main className={styles.mainPage}>
//       <UserNav/>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         textAlign="center"
//         sx={{minHeight: "92vh", p: 1}}
//       >
//         <Container maxWidth="xxl" sx={{ml: 9}}>
//           <Typography
//             variant="h2"
//             alignItems="center"
//             marginBottom={2}
//             sx={{
//               mt: 4,
//               fontWeight: "bold",
//               fontFamily: "Times New Roman, Times, serif",
//             }}
//           >
//             Rapoarte Consultatii
//           </Typography>
//           <Box display="flex" justifyContent="center" mb={4}>
//             <Paper
//               component="form"
//               sx={{display: "flex", alignItems: "center", width: 800}}
//             >
//               <TextField
//                 fullWidth
//                 placeholder="CAUTA PACIENT..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton>
//                       <SearchIcon/>
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Paper>
//           </Box>
//           <Grid container spacing={2}>
//             {filteredAppointments.map((appointment, index) => (
//               <Grid item xs={10} sm={6} md={7} lg={3} key={index}>
//                 <RaportCard appointment={appointment}/>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </main>
//   );
// };
//
// export default RaportConsultatie;
