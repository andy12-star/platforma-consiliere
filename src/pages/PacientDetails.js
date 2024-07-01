import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Grid } from "@mui/material";
import UserNav from "../components/UserNav";
import styles from "./mainPages.module.css";
import ConsultCard from "../components/ConsultCard";
import consultationServiceInstance from "../services/consultation.service";
import {useAuth} from "../services/context/AuthContext";
import TestService from "../services/test.service";
import Chart from "../components/Chart";


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
  return "Acest pacient nu a completat testul de personalitate. Se recomanda sa il completeze!";
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
  return "Acest pacient nu a completat tetsul SMI. Se recomanda sa il completeze!";
};

const calculateYSQScores = (responses) => {
  const categories = {
    "Privatiune Emotionala": [1, 2, 3],
    "Instabilitate": [4, 5, 6],
    "Neincredere": [7, 8, 9],
  };

  const scores = [];
  console.log(responses);
  scores.push({ name: categories[0], Notă: responses.ysqEmotionalPrivacy, Prag: 8 });
  scores.push({ name: categories[1], Notă: responses.ysqInstability, Prag: 8 });
  scores.push({ name: categories[2], Notă: responses.ysqDoubt, Prag: 8 });

  return scores;
};


const PacientDetails = () => {
  const location = useLocation();
  const { patient } = location.state;
  const [consultations, setConsultations] = useState([]);
  const [consultationsAll, setConsultationsAll] = useState([]);

  const [personalitateResponses, setPersonalitateResponses] = useState([]);
  const [smiResponses, setSmiResponses] = useState([]);
  const [ysqScores, setYsqScores] = useState([]);

  const {user}=useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await TestService.getTestResultsForPatient(patient.id);
        setPersonalitateResponses(data.personality);
        setSmiResponses(data.smi );
        setYsqScores(calculateYSQScores(data));
      } catch (error) {
        console.error("Failed to fetch test results", error);
      }
    };

    fetchResults();
  }, [patient.id]);

  const personalitateInterpretation = interpretPersonalitateMean(personalitateResponses);
  const smiInterpretation = interpretSMIMean(smiResponses);


  const fetchAllConsultations = async () => {
    try {

      const data = await consultationServiceInstance.getConsultationForPatientId(patient.id);
      setConsultationsAll(data);
      console.log("consulatii");
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch all consultations", error);
    }
  };

  useEffect( ()=>{
    fetchAllConsultations();
  },[]);

  const fetchConsultations = async () => {
    try {

      const data = await consultationServiceInstance.getConsultationsForDoctorByPatient(user.id,patient.id);
      setConsultations(data);
      console.log("consulatii");
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch consultations", error);
    }
  };

  useEffect( ()=>{
    fetchConsultations();
  },[]);

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
            marginBottom={2}
            sx={{
              mt: 6,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            {patient.firstName} {patient.lastName}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            sx={{
              minHeight: "92vh",
              bgcolor: "#ffff",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 2, }}>
              Date personale
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{
                mb: 3,
                minHeight: "15vh",
                width: "60vh",
                bgcolor: "#F0808040",
                padding: 3,
                borderRadius: 2,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h4" sx={{ mt: 1 }}>
                Nume: {patient.firstName} {patient.lastName}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>
                Data nașterii: {patient.dateOfBirth}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Facultate: {patient.faculty}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Telefon: {patient.phoneNumber}</Typography>
              <Typography variant="h4" sx={{ mt: 0.8 }}>Email: {patient.username}</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 3 }}>
              Dosar Medical
            </Typography>
            <Container maxWidth="xxl" sx={{ ml: 9 }}>

              {(user.roles[0].name==='role_doctor')&&(
                <>
                  <Grid container spacing={2}>
                    {consultations.map((consultation) => (
                      <Grid item xs={20} sm={2} md={2} lg={5.5} key={consultation.id}>
                        <ConsultCard {...consultation} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              {(user.roles[0].name==='role_admin')&&(
                <>
                  <Grid container spacing={2}>
                    {consultationsAll.map((consultation) => (
                      <Grid item xs={20} sm={2} md={2} lg={5.5} key={consultation.id}>
                        <ConsultCard {...consultation} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

            </Container>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{ minHeight: "92vh", p: 1 }}
            >
              <Container maxWidth="xl">
                <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2, mb: 2, }}>

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
                  <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 2, }}>
                    Rezultate Test Personalitate
                  </Typography>
                  <Typography textAlign="left" variant="h4" sx={{ mt: 3 }}>
                    {personalitateInterpretation}
                  </Typography>

                  <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 2, }}>
                    Rezultate Test SMI
                  </Typography>
                  <Typography textAlign="left" variant="h4" sx={{ mt: 3 }}>
                    {smiInterpretation}
                  </Typography>

                  <Box sx={{ width: "100%", mt: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 2, }}>
                      Rezultate Test YSQ
                    </Typography>

                    <Chart data={ysqScores} />
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>

        </Container>
      </Box>

    </main>
  );
};

export default PacientDetails;
