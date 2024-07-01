import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const StyledFormControl = styled(FormControl)({
  "& .MuiInputBase-root": {
    backgroundColor: "#F0F8FF",
    "& fieldset": {
      borderColor: "#041E42",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#041E42",
    },
  },
});

export const StyledTextField = styled(TextField)({
  "& label": {
    color: "#041E42",
  },
  "& label.Mui-focused": {
    color: "#15171c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F0F8FF",
    "& fieldset": {
      borderColor: "#041E42",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#041E42",
    },
  },
});


export const StyledButton = styled(Button)({
  borderColor: "#15171c",
  borderRadius: 30,
  padding: "20px 26px",
  fontSize: "18px",
  color: "#120a8f",
  position: "relative",
  bottom: "20px",
  borderWidth: 10,
  backgroundColor: "#F8837940",
  "&:hover": {
    backgroundColor: "#E2725B80",
    borderWidth: 2,
  },
});

export const StyledCalendar = styled(Calendar)({
  width: "1200px",
  height: "600px",
  fontSize: "2rem",
  "& .react-calendar__tile--active": {
    mt: 3,
    background: "#8e7cc3 !important",
    color: "white !important",
  },
  "& .HONORED": {
    backgroundColor: "#98fb98 !important",
  },
  "& .UNHONORED": {
    backgroundColor: "#f08080 !important",
  },
  "& .appointment-future": {
    backgroundColor: "#ffa07a !important",
  },
  "& .react-calendar__month-view__days__day": {
    fontSize: "2rem",
  },
  "& .react-calendar__navigation button": {
    fontSize: "2rem",
  },
  "& .react-calendar__tile": {
    minHeight: "80px",
  },
  "& .UNCONFIRMED": {
    backgroundColor: "#ffb6c1 !important",
  },
  "& .CONFIRMED": {
    backgroundColor: "#add8e6 !important",
  },
  "& .CANCELED": {
    backgroundColor: "#ffcccb !important",
  },
  "& .holiday": {
    backgroundColor: "#ff6961 !important",
    color: "white !important",
  },
});

