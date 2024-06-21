import React, {useState} from "react";
import {Box, Container, Divider, TextField, Typography} from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import {useAuth} from "../services/context/AuthContext";
import {StyledButton} from "../components/styledComp";
import UserService from "../services/user.service";

const userFormFields = [
  "id",
  "firstName",
  "lastName",
  "dateOfBirth",
  "username",
  "phoneNumber",
  "faculty",
];

const Profil = () => {
  const {user, setUser: updateUser} = useAuth();

  const initialUserData = userFormFields.reduce((acc, field) => {
    if (user[field] !== undefined) acc[field] = user[field];
    return acc;
  }, {});

  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({...initialUserData});

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value, type: 'USER'});
  };

  const handleSave = async () => {
    try {
      console.log("userData: ", userData);
      const updatedUser = await UserService.saveUser(userData);
      console.log("updatedUser: ", updatedUser);
      updateUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <main className={styles.mainPage}>
      <UserNav/>
      <section2>
        <Container>
          <Typography
            variant="h2"
            marginBottom={2}
            sx={{
              mt: 10,
              ml: 61,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Profil
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            marginTop={4}
            textAlign="left"
            sx={{
              minHeight: "40vh",
              p: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: 3,
              borderRadius: 2,
            }}
          >
            {editMode ? (
              <>
                <TextField
                  fullWidth
                  label="Nume"
                  name="firstName"
                  InputLabelProps={{style: {fontSize: "1.5rem"}}}
                  InputProps={{style: {fontSize: "1.5rem"}}}
                  value={userData.firstName}
                  onChange={handleInputChange}
                  sx={{marginBottom: 2}}
                />
                <TextField
                  fullWidth
                  label="Prenume"
                  name="lastName"
                  InputLabelProps={{style: {fontSize: "1.5rem"}}}
                  InputProps={{style: {fontSize: "1.5rem"}}}
                  value={userData.lastName}
                  onChange={handleInputChange}
                  sx={{marginBottom: 2}}
                />
                <TextField
                  fullWidth
                  label="Data nașterii"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}}
                  InputProps={{style: {fontSize: "1.5rem"}}}
                  value={userData.dateOfBirth}
                  onChange={handleInputChange}
                  sx={{marginBottom: 2}}
                />
                <TextField
                  fullWidth
                  label="Adresa de mail"
                  name="username"
                  InputLabelProps={{style: {fontSize: "1.5rem"}}}
                  InputProps={{style: {fontSize: "1.5rem"}}}
                  value={userData.username}
                  onChange={handleInputChange}
                  sx={{marginBottom: 2}}
                />
                <TextField
                  fullWidth
                  label="Numar de telefon"
                  name="phoneNumber"
                  InputLabelProps={{style: {fontSize: "1.5rem"}}}
                  InputProps={{style: {fontSize: "1.5rem"}}}
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  sx={{marginBottom: 2}}
                />
                {user.roles[0].name === "role_user" && (
                  <TextField
                    fullWidth
                    label="Facultate"
                    name="faculty"
                    InputLabelProps={{style: {fontSize: "1.5rem"}}}
                    InputProps={{style: {fontSize: "1.5rem"}}}
                    value={userData.faculty}
                    onChange={handleInputChange}
                    sx={{marginBottom: 2}}
                  />
                )}
                <StyledButton
                  variant="contained"
                  sx={{mt: 3}}
                  onClick={handleSave}
                >
                  Salvează
                </StyledButton>
                <StyledButton
                  variant="contained"
                  sx={{mt: 3, ml: 2}}
                  onClick={() => setEditMode(false)}
                >
                  Anulează
                </StyledButton>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  textAlign="left"
                  gutterBottom
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Nume: {user.firstName}
                </Typography>
                <Divider/>
                <Typography
                  variant="h4"
                  textAlign="left"
                  gutterBottom
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Prenume: {user.lastName}
                </Typography>
                <Divider/>
                <Typography
                  variant="h4"
                  textAlign="left"
                  gutterBottom
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Data nașterii: {user.dateOfBirth}
                </Typography>
                <Divider/>
                <Typography
                  variant="h4"
                  textAlign="left"
                  gutterBottom
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Adresa de mail: {user.username}
                </Typography>
                <Divider/>
                <Typography
                  variant="h4"
                  textAlign="left"
                  gutterBottom
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Numar de telefon: {user.phoneNumber}
                </Typography>
                <Divider/>
                {user.roles[0].name === "role_user" && (
                  <>
                    <Typography
                      variant="h4"
                      textAlign="left"
                      gutterBottom
                      sx={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        fontFamily: "Times New Roman, Times, serif",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Facultate: {user.faculty}
                    </Typography>
                    <Divider/>
                  </>
                )}
                <StyledButton
                  variant="contained"
                  sx={{mt: 6}}
                  onClick={() => setEditMode(true)}
                >
                  Editeaza profilul
                </StyledButton>
              </>
            )}
          </Box>
        </Container>
      </section2>
    </main>
  );
};

export default Profil;
