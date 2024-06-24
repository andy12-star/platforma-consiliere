import React, { useEffect, useState } from "react";
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
    return "Aceasta sugerează că sunteți o persoană extrem de sociabilă, empatică și organizată, cu un puternic sentiment de curiozitate și stabilitate emoțională";
  if (mean >= 1.5 && mean < 2.5)
    return "Sunteți moderat sociabil și curios, vă bucurați de interacțiunile sociale și explorați subiecte noi într-o măsură rezonabilă. Aveți o bună empatie și vă puteți raporta la emoțiile altora, deși nu la fel de intens.";
  if (mean >= 2.5 && mean < 3.5)
    return "Ești sentimental, folosești instrumente organizaționale și înveți din greșelile tale. Te simți încrezător și confortabil în inițierea conversațiilor cu oameni interesanți.";
  if (mean >= 3.5 && mean < 4.5)
    return "Dai dovadă de o personalitate echilibrată. Apreciezi organizarea, înveți din greșeli și ai încredere în interacțiunile sociale.";
  if (mean >= 4.5 && mean < 5.5)
    return "Sunteți introvertit, preferați stabilitatea și evitați noile conexiuni sociale. Ai tendința să te mulțumești cu subiectele cunoscute, să menții distanța emoțională.";
  if (mean >= 5.5 && mean <= 6)
    return "Sunteți foarte introvertit, nu vă plac interacțiunile sociale și evitați experiențe noi. Ești detașat emoțional, dezorganizat și ușor de stresat. Îți lipsește încrederea și te îndoiești adesea de abilitățile tale.";
  return "Testul nu a fost completat.";
};

const interpretSMIMean = (mean) => {
  if (mean >= 1 && mean < 1.5)
    return "Este posibil să vă simțiți profund conectat la emoțiile și experiențele voastre, trăind adesea sentimente intense. Cu toate acestea, această conexiune emoțională puternică te poate face predispus la lupte cu stima de sine și controlul impulsurilor.";
  if (mean >= 1.5 && mean < 2.5)
    return "Probabil că aveți o nevoie profundă de acceptare și validare, ceea ce poate duce uneori la provocări în gestionarea valorii de sine și a relațiilor interpersonale.";
  if (mean >= 2.5 && mean < 3.5)
    return "Probabil că veți experimenta un amestec sănătos de înalte și scăzute emoționale, cu lupte ocazionale legate de stima de sine și dinamica interpersonală. Sunteți conștient de sine și reflexiv, adesea capabil să înțelegeți și să vă exprimați sentimentele.";
  if (mean >= 3.5 && mean < 4.5)
    return "Probabil că îți este ușor să te adaptezi la diverse situații fără a fi prea influențat de emoțiile tale. În timp ce mențineți un echilibru între experiențele voastre interne și interacțiunile externe, pot exista momente în care problemele emoționale mai profunde nu sunt abordate pe deplin.";
  if (mean >= 4.5 && mean < 5.5)
    return "S-ar putea să vă fie mai ușor să vă gestionați emoțiile și să vă mențineți autocontrolul, părând adesea calm și liniștit chiar și în situații stresante. Cu toate acestea, acest lucru ar putea indica, de asemenea, o tendință de a suprima sentimentele sau de a evita de a face față problemelor emoționale.";
  if (mean >= 5.5 && mean <= 6)
    return "Probabil că aveți un sentiment puternic al valorii de sine și vă este ușor să navigați în relațiile interpersonale fără a fi prea influențat de emoții. Această independență puternică și încredere în tine înseamnă că ești bine echipat pentru a face față provocărilor vieții.";
  return "Testul nu a fost completat.";
};

const calculateYSQScores = (responses) => {
  const categories = {
    "Privatiune Emotionala": [1, 2, 3],
    Instabilitate: [4, 5, 6],
    "Neincredere": [7, 8, 9],
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
  const [personalitateResponses, setPersonalitateResponses] = useState([1, 2, 3, 4, 5, 6]);
  const [smiResponses, setSmiResponses] = useState([2, 3, 4, 5, 6, 1]);
  const [ysqResponses, setYsqResponses] = useState([3, 4, 5, 6, 1, 2, 3, 4, 5]);
  const [ysqScores, setYsqScores] = useState(calculateYSQScores([3, 4, 5, 6, 1, 2, 3, 4, 5]));

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