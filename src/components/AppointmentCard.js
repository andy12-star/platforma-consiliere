import * as React from "react";
import { Box, Typography, Paper, Drawer, IconButton } from "@mui/material";
import { StyledButton } from "./styledComp";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({
  status,
  title,
  date,
  time,
  specializare,
  doctor,
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/rapoarteconsultatie");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Programare neonorata":
        return "error.main";
      case "Programare onorata":
        return "success.main";
      case "unknown":
        return "warning.main";
      default:
        return "grey.500";
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          fontSize: "16px",
          width: "100%",
        }}
      >
        {status !== "unknown" && (
          <Box
            display="flex"
            justifyContent="center"
            marginBottom={5}
            sx={{
              bgcolor: getStatusColor(status),
              color: "white",
              borderRadius: 1,
              padding: 1,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {status}
          </Box>
        )}
        <Typography variant="h5" textAlign="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom>
          {time}
        </Typography>

        <Box display="flex" alignItems="center" marginTop={2}>
          <Box>
            <Typography
              variant="h5"
              textAlign="center"
              gutterBottom
              fontWeight="bold"
            >
              {specializare}
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              gutterBottom
              color="textSecondary"
            >
              {doctor}
            </Typography>
          </Box>
        </Box>
        <StyledButton
          fullWidth
          variant="contained"
          sx={{
            marginTop: 4,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: "#FF6347" },
          }}
          onClick={handleDrawerToggle}
        >
          VEZI DETALII PROGRAMARE
        </StyledButton>
      </Paper>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 700,
            padding: 9,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 30,
              right: 16,
              mr: 6,
              mt: 5.5,
            }}
            onClick={handleDrawerToggle}
          >
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Typography
            variant="h3"
            alignItems="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Detalii programare
          </Typography>
          <Box
            sx={{
              bgcolor: "#ADD8E6",
              padding: 12,
              borderRadius: 8,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              mt: 3,
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              {title}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Ziua programarii: {date}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Ora programarii: {time}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Specializare: {specializare}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Descriere: {doctor}
            </Typography>
          </Box>
          <StyledButton
            variant="contained"
            sx={{ mt: 8, "&:hover": { bgcolor: "#FF6347" } }}
            onClick={handleButtonClick}
          >
            Vezi raport consultatie
          </StyledButton>
        </Box>
      </Drawer>
    </>
  );
};

export default AppointmentCard;
