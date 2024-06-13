import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import UserNav from "../components/UserNav";
import { StyledButton } from "../components/styledComp";
import { useNavigate } from "react-router-dom";
import styles from "./mainPages.module.css";

const questions = [
  {
    number: 1,
    text: "In general nu am avut pe cineva care sa aiba grija de mine, caruia sa-l impartasesc din viata mea sau caruia sa-i pese mult de ce se intampla cu mine.",
  },
  {
    number: 2,
    text: "M-am agatat de cei apropiati mie pentru ca m-am temut ca ma vor parasi.",
  },
  { number: 3, text: "Simt ca oamenii vor profita de mine." },
  {
    number: 4,
    text: "Nu-mi gasesc locul nicaieri.",
  },
  {
    number: 5,
    text: "Nici un barbat/femeie pe care il/o cunosc nu ma poate iubi odata ce imi va vedea defectele.",
  },
  {
    number: 6,
    text: "Este important pentru mine sa fiu placut/a de aproape toti pe care ii cunosc.",
  },
  {
    number: 7,
    text: "Chiar si cand lucrurile par sa mearga bine, eu cred ca este doar temporar.",
  },
  { number: 8, text: "Daca fac o greseala, merit sa fiu pedepsit/a." },
  {
    number: 9,
    text: "In majoritatea activitatilor scolare sau de serviciu nu sunt la del de bun ca si ceilalti.",
  },
  {
    number: 10,
    text: "Nu ma simt in stare sa ma descurc singur/a in viata de zi cu zi.",
  },
  {
    number: 11,
    text: "Nu pot scapa de sentimentul ca ceva rau e pe cale sa se intample.",
  },
];

const TestYSQ = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleResponseChange = (questionNumber, value) => {
    const newResponses = [...responses];
    newResponses[questionNumber - 1] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    localStorage.setItem("testYSQResponses", JSON.stringify(responses));
    navigate("/rezultateteste");
  };

  return (
    <main className={styles.mainPage}>
      <UserNav />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ minHeight: "92vh", bgcolor: "#E1EBEE", p: 1 }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              mt: 4,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Test YSQ
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={4}
            textAlign="center"
            sx={{
              minHeight: "92vh",
              p: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Box sx={{ mb: 3, width: "100%" }}>
              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                1 - Complet neadecvat ; 2 - In parte neadevarat pentru mine; 3 -
                Mai mult adevarat decat neadevat; 4 - Mediu adevarat; 5 - Destul
                de adevarat despre mine; 6 - Ma descrie perfect;
              </Typography>
            </Box>
            {questions.map((question) => (
              <Box key={question.number} sx={{ mb: 3, width: "100%" }}>
                <Typography variant="h4" align="left" gutterBottom>
                  {question.number}. {question.text}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label={`question-${question.number}`}
                    name={`question-${question.number}`}
                    value={responses[question.number - 1]}
                    onChange={(e) =>
                      handleResponseChange(
                        question.number,
                        parseInt(e.target.value)
                      )
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <FormControlLabel
                        key={num}
                        value={num}
                        control={<Radio />}
                        label={<Typography variant="h5">{num}</Typography>}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            ))}
            <StyledButton
              sx={{
                mt: 3,
                bgcolor: "#B9D9EB",
                "&:hover": { bgcolor: "#B2BAC2" },
              }}
              onClick={handleSubmit}
            >
              Submit questions
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default TestYSQ;
