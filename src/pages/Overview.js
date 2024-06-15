/* import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserNav from "../components/UserNav";
import { StyledButton } from "../components/styledComp";
import styles from "./Overview.module.css";

export default function Overview() {
  const navigate = useNavigate();
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("ro-RO", options);

  const handleButtonClick = () => {
    navigate("/programare");
  };

  return (
    <main classname={styles.overview}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{ minHeight: "92vh", bgcolor: "#E1EBEE", p: 1 }}
      >
        <Box
          sx={{
            bgcolor: "#ADD8E6",
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            component="p"
            gutterBottom
            sx={{
              mb: 5,
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            {formattedDate}
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              mb: 15,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Welcome to Your Dashboard!
          </Typography>
          <StyledButton onClick={handleButtonClick} sx={{ mt: 3 }}>
            Solicita o programare
          </StyledButton>
        </Box>
      </Box>
    </main>
  );
}
*/
import { useNavigate } from "react-router-dom";
import UserNav from "../components/UserNav";
import styles from "./Overview.module.css";
import { StyledButton } from "../components/styledComp";

export default function Overview() {
  const navigate = useNavigate();
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("ro-RO", options);

  const handleButtonClick = () => {
    navigate("/programare");
  };
  return (
    <main className={styles.overview}>
      <UserNav />
      <section>
        <h2>{formattedDate}</h2>
        <container>
          <h1
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Welcome to your Dashboard!
          </h1>
        </container>
        <StyledButton onClick={handleButtonClick} sx={{ mt: 1 }}>
          Solicita o programare
        </StyledButton>
      </section>
    </main>
  );
}
