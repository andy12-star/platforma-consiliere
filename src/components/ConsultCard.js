import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  DialogTitle,
  Dialog,
  DialogContent,
  Divider,
  DialogActions,
} from "@mui/material";
import { StyledButton } from "./styledComp";

const ConsultCard = ({ doctor, date, details }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        marginBottom: 3,
        marginTop: 3,
        borderRadius: 4,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            maxWidth: 450,
            marginBottom: 3,
            marginTop: 3,
            height: 120,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#E1EBEE",
            borderRadius: 5,
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            alignItems="center"
            sx={{
              mt: 6,
            }}
          >
            {doctor}
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h5" color="text.secondary">
            DATA CONSULTATIEI
          </Typography>
          <Typography variant="h6">{date}</Typography>
        </Box>
        <StyledButton
          fullWidth
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            marginTop: 4,
            textTransform: "none",
            fontSize: "18px",
          }}
        >
          VEZI DETALII RAPORT
        </StyledButton>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Detalii raport
          </DialogTitle>
          <DialogContent>
            <Box sx={{ p: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                TRIMIS DE
              </Typography>

              <Typography variant="h4">{details.trimisDe}</Typography>
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SERVICII
              </Typography>
              <Typography variant="h4">{details.servicii}</Typography>
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DURATA SEDINTEI
              </Typography>

              <Typography variant="h4">{details.simptome}</Typography>
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                OBSERVATII :
              </Typography>
              <Typography variant="h4">{details.clinice}</Typography>
              <Divider />
              <Box sx={{ my: 2 }} />
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                RECOMANDARI
              </Typography>
              <Typography variant="h4">{details.paraclinice}</Typography>
              <Divider />
            </Box>
          </DialogContent>
          <DialogActions>
            <StyledButton
              onClick={handleClose}
              variant="contained"
              sx={{
                mr: 4,
                mt: 3,
                fontSize: "1.5rem",
              }}
            >
              inchide
            </StyledButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ConsultCard;
