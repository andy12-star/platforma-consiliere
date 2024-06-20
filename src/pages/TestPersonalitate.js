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
import TestService from "../services/test.service";

const questions = [
  {
    number: 1,
    text: "Iti faci frecvent prieteni noi.",
  },
  {
    number: 2,
    text: "Petreci mult timp liber explorand diverse subiecte aleatorii care iti starnesc interesul.",
  },
  {
    number: 3,
    text: "Cand ii vezi pe altii plangand, parca simti ca si tie iti vine sa plangi.",
  },
  {
    number: 4,
    text: "Concepi adesea un plan de rezerva pentru un plan de rezerva.",
  },
  {
    number: 5,
    text: "De obicei iti mentii calmul, chiar si sub multa presiune.",
  },
  {
    number: 6,
    text: "Preferi sa termini de tot un proiect inainte de a inceoe altul.",
  },
  { number: 7, text: "Esti foarte sentimental/a." },
  {
    number: 8,
    text: "Iti place sa folosesti instrumente de organizare, cum ar fi programele si listele.",
  },
  {
    number: 9,
    text: "Chiar si o mica greseala te poate face sa iti pui semnul intrebarii abilitatile si cunostintele generale.",
  },
  {
    number: 10,
    text: "Te simti in largul tau cand abordezi o persoana interesanta si initiezi o conversatie.",
  },
];

const TestPersonalitate = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleResponseChange = (questionNumber, value) => {
    const newResponses = [...responses];
    newResponses[questionNumber - 1] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      await TestService.submitTest("personalitate", responses);
      navigate("/rezultateteste");
    } catch (error) {
      console.error("Failed to submit test", error);
    }
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
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              mt: 4,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Test personalitate
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
                1 - sunt de acord; 6 - nu sunt de acord;
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
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
              }}

            >
              Submit questions
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default TestPersonalitate;
