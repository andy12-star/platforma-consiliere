import { Container, Typography, Divider, Box } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import { useAuth } from "../services/context/AuthContext";

const Profil = () => {
  const { user } = useAuth();

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <section2>
        <Container>
          <Typography
            variant="h2"
            marginBottom={2}
            sx={{
              mt: 6,
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
              minHeight: "55vh",
              p: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: 3,
              borderRadius: 2,
            }}
          >
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
            <Divider />
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
            <Divider />
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
            <Divider />
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
            <Divider />
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
            <Divider />
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
            <Divider />
          </Box>
        </Container>
      </section2>
    </main>
  );
};

export default Profil;
