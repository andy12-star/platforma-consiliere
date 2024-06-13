import React from "react";
import { Container, Typography, Box } from "@mui/material";
import UserNav from "../components/UserNav";
import Chart from "../components/Chart";
import styles from "./mainPages.module.css";

const getMean = (responses) => {
  const sum = responses.reduce((acc, val) => acc + val, 0);
  return sum / responses.length;
};

const interpretPersonalitateMean = (mean) => {
  if (mean >= 1 && mean < 1.5)
    return "It suggests that you are a highly sociable, empathetic, and organized individual with a strong sense of curiosity and emotional stability";
  if (mean >= 1.5 && mean < 2.5)
    return "2 - You are moderately sociable and curious, enjoying social interactions and exploring new topics to a reasonable extent. You have a fair amount of empathy and can relate to others' emotions, though not as intensely. ";
  if (mean >= 2.5 && mean < 3.5)
    return "You are sentimental, use organizational tools, and learn from your mistakes. You feel confident and comfortable initiating conversations with interesting people.";
  if (mean >= 3.5 && mean < 4.5)
    return " You exhibit a balanced personality.ou value organization, learn from mistakes, and are confident in social interactions.";
  if (mean >= 4.5 && mean < 5.5)
    return "You are introverted, prefer stability, and avoid new social connections. You tend to be content with known subjects, maintain emotional distance";
  if (mean >= 5.5 && mean <= 6)
    return " You are highly introverted, dislike social interactions, and avoid new experiences. You are emotionally detached, disorganized, and easily stressed. You lack confidence and often doubt your abilities.";
  return "Testul nu a fost completat.";
};

const interpretSMIMean = (mean) => {
  if (mean >= 1 && mean < 1.5)
    return "ou are likely to feel deeply connected to your emotions and experiences, often experiencing intense feelings. However, this strong emotional connection might make you prone to struggles with self-esteem and impulse control.";
  if (mean >= 1.5 && mean < 2.5)
    return "You likely have a deep-seated need for acceptance and validation, which can sometimes lead to challenges in managing self-worth and interpersonal relationships. ";
  if (mean >= 2.5 && mean < 3.5)
    return " You likely experience a healthy mix of emotional highs and lows, with occasional struggles related to self-esteem and interpersonal dynamics. You are self-aware and reflective, often able to understand and articulate your feelings.";
  if (mean >= 3.5 && mean < 4.5)
    return "ou likely find it easy to adapt to various situations without being overly swayed by your emotions. While you maintain a balance between your internal experiences and external interactions, there might be times when deeper emotional issues are not fully addressed.";
  if (mean >= 4.5 && mean < 5.5)
    return "You might find it easier to manage your emotions and maintain self-control, often appearing calm and collected even in stressful situations. However, this could also indicate a tendency to suppress feelings or avoid dealing with emotional issues. s";
  if (mean >= 5.5 && mean <= 6)
    return "You likely have a robust sense of self-worth and find it easy to navigate interpersonal relationships without being overly influenced by emotions. This strong independence and self-confidence mean you are well-equipped to handle life's challenges. ";
  return "Testul nu a fost completat.";
};

const calculateYSQScores = (responses) => {
  const categories = {
    "Privatiune Emotionala": [1, 2, 3],
    Instabilitate: [4, 5, 6],
    "Neincredere/Abuz": [7, 8, 9],
  };

  const scores = [];

  for (const category in categories) {
    const questionIndices = categories[category];
    const totalScore = questionIndices.reduce(
      (sum, index) => sum + responses[index - 1],
      0
    );
    scores.push({ name: category, Notă: totalScore, Prag: 8 });
  }

  return scores;
};

const RezultateTest = () => {
  const personalitateResponses = JSON.parse(
    localStorage.getItem("testResponses") || "[]"
  );
  const smiResponses = JSON.parse(
    localStorage.getItem("testSMIResponses") || "[]"
  );
  const testYSQResponses =
    JSON.parse(localStorage.getItem("testYSQResponses")) || [];
  const ysqScores = calculateYSQScores(testYSQResponses);

  const personalitateMean = getMean(personalitateResponses);
  const smiMean = getMean(smiResponses);

  const personalitateInterpretation =
    interpretPersonalitateMean(personalitateMean);
  const smiInterpretation = interpretSMIMean(smiMean);

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
            align="center"
            gutterBottom
            sx={{
              mt: 4,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Rezultate Teste
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
            <Typography
              textAlign="left"
              variant="h4"
              gutterBottom
              sx={{
                mt: 2,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Rezultate Test Personalitate
            </Typography>
            <Typography textAlign="left" variant="h4" sx={{ mt: 3 }}>
              {personalitateInterpretation}
            </Typography>

            <Typography
              textAlign="left"
              variant="h4"
              gutterBottom
              sx={{
                mt: 4,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Rezultate Test SMI
            </Typography>
            <Typography textAlign="left" variant="h4" sx={{ mt: 3 }}>
              {smiInterpretation}
            </Typography>

            <Box sx={{ width: "100%", mt: 4 }}>
              <Typography
                textAlign="left"
                variant="h4"
                gutterBottom
                sx={{
                  mt: 4,
                  mb: 3,
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Rezultate Test YSQ
              </Typography>
              <Chart data={ysqScores} />
            </Box>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default RezultateTest;
