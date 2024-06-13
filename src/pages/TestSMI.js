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
    text: "Cer respect, nelasandu-i pe oameni sa ma trateze ca pe un nimic.",
  },
  {
    number: 2,
    text: "Ma simt iubt/a si acceptat/a.",
  },
  { number: 3, text: "Imi refuz diverse placeri, intrucat nu le merit." },
  {
    number: 4,
    text: "Ma simt fundamental inadecvat/a, imperfect/a, cu defecte.",
  },
  {
    number: 5,
    text: "Ma simt pierduta.",
  },
  {
    number: 6,
    text: "Incerc din rasputeri sa-i multumesc pe ceilalti ca sa evit conflictul , confruntarile sau respingerea.",
  },
  {
    number: 7,
    text: "Fac in asa fel incat sa fiu in centrul atentiei.",
  },
  {
    number: 8,
    text: "Nu am rabdare sa indeplinesc sarcini de rutina si plictisitoare. ",
  },
];

const TestSMI = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleResponseChange = (questionNumber, value) => {
    const newResponses = [...responses];
    newResponses[questionNumber - 1] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    localStorage.setItem("testSMIResponses", JSON.stringify(responses));
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
            Test SMI
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
                1 - Niciodata sau aproape niciodata; 2- Rareori; 3 - Din cand in
                cand; 4 - Frecvent; 5 - De cele mai multe ori; 6 - Intotdeauna;
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

export default TestSMI;
