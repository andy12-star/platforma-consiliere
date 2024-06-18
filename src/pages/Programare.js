// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import UserNav from "../components/UserNav";
// import { StyledButton } from "../components/styledComp";
// import styles from "./mainPages.module.css";
// import { useAuth } from "../services/context/AuthContext";
// import AppointmentService from "../services/appointment.service";
//
// const Programare = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [newSpecialization, setNewSpecialization] = useState("");
//   const [newDoctor, setNewDoctor] = useState("");
//   const[newLocation, setNewLocation]=useState("");
//   const[newDate, setNewDate]=useState("");
//   const[newHour, setNewHour]=useState("");
//
//
//   const [open, setOpen] = useState(false);
//
//   const { user } = useAuth();
//
//
//
//
//   const handleSpecializationChange = (e) => {
//     setNewSpecialization(e.target.value);
//   };
//
//   const handleDoctorChange = (e) => {
//     setNewDoctor(e.target.value);
//   };
//
//   const handleLocationChange = (e) => {
//     setNewLocation(e.target.value);
//   };
//
//   const handleDateChange = (e) => {
//     setNewDate(e.target.value);
//   };
//
//   const handleHourChange = (e) => {
//     setNewHour(e.target.value);
//   };
//
//   const handleAddAppointment = async () => {
//
//     const newAppointment = {
//       id: null,
//       specialization:newSpecialization,
//       doctor:newDoctor,
//       location:newLocation,
//       date:newDate,
//       hour:newHour,
//       userId: user.id,
//     };
//
//     try {
//       await AppointmentService.addAppointment(newAppointment);
//       const updatedAppointments = await AppointmentService.getAppointmentsForPatient(user.id);
//       setAppointments(updatedAppointments);
//       setNewSpecialization("");
//         setNewDoctor("");
//         setNewLocation("");
//         setNewDate("");
//         setNewHour("");
//
//       setOpen(false);
//     } catch (error) {
//       console.error("Failed to add appointment", error);
//     }
//   };
//
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//
//   const handleClose = () => {
//     setOpen(false);
//   };
//
//   return (
//     <main className={styles.mainPage}>
//       <UserNav />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         textAlign="center"
//         sx={{
//           minHeight: "92vh",
//           p: 1,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Typography
//             variant="h2"
//             gutterBottom
//             sx={{
//               mt: 4,
//               fontWeight: "bold",
//               fontFamily: "Times New Roman, Times, serif",
//             }}
//           >
//             programare
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             marginTop={4}
//             textAlign="center"
//             sx={{
//               minHeight: "92vh",
//               p: 3,
//               bgcolor: "#ffffff",
//               padding: 3,
//               borderRadius: 2,
//
//               boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <StyledButton
//               onClick={handleClickOpen}
//               sx={{
//                 mt: 3,
//                 mb: 3,
//               }}
//             >
//               Adauga PROGRAMARE
//             </StyledButton>
//
//             <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//               <DialogTitle
//                 sx={{
//                   fontSize: "2.5rem",
//                   fontWeight: "bold",
//                   fontFamily: "Times New Roman, Times, serif",
//                 }}
//               >
//                 Adauga Notita
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label={
//                     <Typography variant="h6" sx={{ fontSize: "2rem" }}>
//                       specializare
//                     </Typography>
//                   }
//                   fullWidth
//                   value={newSpecialization}
//                   onChange={handleSpecializationChange}
//                   InputProps={{
//                     style: { fontSize: "1.5rem" },
//                   }}
//                 />
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label={
//                     <Typography variant="h6" sx={{ fontSize: "2rem" }}>
//                       doctor
//                     </Typography>
//                   }
//                   fullWidth
//                   value={newDoctor}
//                   onChange={handleDoctorChange}
//                   InputProps={{
//                     style: { fontSize: "1.5rem" },
//                   }}
//                 />
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label={
//                     <Typography variant="h6" sx={{ fontSize: "2rem" }}>
//                       location
//                     </Typography>
//                   }
//                   fullWidth
//                   value={newLocation}
//                   onChange={handleLocationChange}
//                   InputProps={{
//                     style: { fontSize: "1.5rem" },
//                   }}
//                 />
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label={
//                     <Typography variant="h6" sx={{ fontSize: "2rem" }}>
//                       date
//                     </Typography>
//                   }
//                   fullWidth
//                   value={newDate}
//                   onChange={handleDateChange}
//                   InputProps={{
//                     style: { fontSize: "1.5rem" },
//                   }}
//                 />
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label={
//                     <Typography variant="h6" sx={{ fontSize: "2rem" }}>
//                       hour
//                     </Typography>
//                   }
//                   fullWidth
//                   value={newHour}
//                   onChange={handleHourChange}
//                   InputProps={{
//                     style: { fontSize: "1.5rem" },
//                   }}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <StyledButton
//                   onClick={handleClose}
//                   color="primary"
//                   sx={{ fontSize: "1.5rem", mr: 3 }}
//                 >
//                   Cancel
//                 </StyledButton>
//                 <StyledButton
//                   onClick={handleAddAppointment()}
//                   color="primary"
//                   sx={{ fontSize: "1.5rem", mr: 3 }}
//                 >
//                   Adauga
//                 </StyledButton>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </Container>
//       </Box>
//     </main>
//   );
// };
//
// export default Programare;

import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledTextField, StyledButton } from "../components/styledComp";
import styles from "./mainPages.module.css";
import { Container } from "@mui/system";
import AppointmentService from "../services/appointment.service";
import { useAuth } from "../services/context/AuthContext";

function Programare() {
  const { user } = useAuth();

  const validationSchema = Yup.object({
    specialization: Yup.string().required("Specialization is required"),
    doctor: Yup.string().required("Doctor is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.string().required("Date is required"),
    hour: Yup.string().required("Preferred hour is required"),
  });

  const handleAppointment = async (values, actions) => {
    const newAppointment = {
      userId: user.id,
      specialization: values.specialization,
      doctor: values.doctor,
      location: values.location,
      date: values.date,
    };

    try {
      await AppointmentService.addAppointment(newAppointment);
    } catch (error) {
      console.error("Failed to add appointment", error);
      actions.setFieldError("general", "Failed to schedule appointment");
    }
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
          textAlign="center"
          sx={{
            ml: 25,
            mt: 15,
            bgcolor: "#F0808040",
            padding: 10,
            borderRadius: 10,
            width: "85%",
            maxWidth: 700,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Programare Medicală
          </Typography>
          <Formik
            initialValues={{
              specialization: "",
              doctor: "",
              location: "",
              date: "",
              hour: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAppointment}
          >
            {(props) => (
              <Form>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="specialization-label">
                    Specializare
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="specialization-label"
                    id="specialization"
                    name="specialization"
                    value={props.values.specialization}
                    onChange={props.handleChange}
                    error={
                      props.touched.specialization &&
                      Boolean(props.errors.specialization)
                    }
                  >
                    <MenuItem value={"Consiliere educationala"}>
                      Consiliere educationala
                    </MenuItem>
                    <MenuItem value={"Consiliere profesionala"}>
                      Consiliere profesionala
                    </MenuItem>
                    <MenuItem value={"Consiliere psihologica"}>
                      Consiliere psihologica
                    </MenuItem>
                    <MenuItem value={"terapie online"}>Terapie online</MenuItem>
                    <MenuItem value={"Life Coaching"}>Life Coaching</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="doctor"
                  name="doctor"
                  label="Doctor"
                  value={props.values.doctor}
                  onChange={props.handleChange}
                  error={props.touched.doctor && Boolean(props.errors.doctor)}
                  helperText={props.touched.doctor && props.errors.doctor}
                  margin="normal"
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="location"
                  name="location"
                  label="Locatie"
                  value={props.values.location}
                  onChange={props.handleChange}
                  error={
                    props.touched.location && Boolean(props.errors.location)
                  }
                  helperText={props.touched.location && props.errors.location}
                  margin="normal"
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="date"
                  name="date"
                  label="Data programare"
                  type="date"
                  value={props.values.date}
                  onChange={props.handleChange}
                  error={props.touched.date && Boolean(props.errors.date)}
                  helperText={props.touched.date && props.errors.date}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Field
                  as={StyledTextField}
                  fullWidth
                  id="hour"
                  name="hour"
                  label="Ora preferata"
                  type="time"
                  value={props.values.hour}
                  onChange={props.handleChange}
                  error={props.touched.hour && Boolean(props.errors.hour)}
                  helperText={props.touched.hour && props.errors.hour}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
                  Submit
                </StyledButton>
                {props.errors.general && (
                  <Typography
                    variant="body2"
                    style={{
                      color: "red",
                      marginTop: "1em",
                      fontSize: "1.5rem",
                    }}
                  >
                    {props.errors.general}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </main>
  );
}

export default Programare;
