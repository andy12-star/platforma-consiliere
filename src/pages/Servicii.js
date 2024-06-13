import PageNav from "../components/PageNav";
import styles from "./mainPages.module.css";

function Servicii() {
  return (
    <main className={styles.mainPage}>
      <PageNav />
      <section>
        <img src="ht.jpg" alt="hipnoterapie" />
        <div>
          <h2>Hipnoterapia</h2>
          <p>
            Hipnoterapia este o tehnica psihoterapeutica ce poate usura si
            scurta mult procesul de vindecare a persoanei prin accesarea
            subconstientului. cunoasterea individuala vine in completarea
            cunoasterii rationale si ne ajuta sa identificam resursele
            interioare.
          </p>
        </div>
      </section>
      <section>
        <img src="lc.jpg" alt="lc" />
        <div>
          <h2>Life Coaching</h2>
          <p>
            Life coaching-ul se concentreaza pe asistarea clientilor in
            depasirea obstacolelor cu care se confrunta in prezent. Reprezinta o
            relatie sinergica intre doua persoane, bazata pe respect reciproc,
            in cadrul careia coach-ul ajuta clientul sa avanseze in directia
            potrivita cu ajutorul obiectivelor pozitive.
          </p>
        </div>
      </section>
      <section>
        <img src="po.jpg" alt="po" />
        <div>
          <h2>Psihoterapie online</h2>
          <p>
            Hipnoterapia este o tehnica psihoterapeutica ce poate usura si
            scurta mult procesul de vindecare a persoanei prin accesarea
            subconstientului. cunoasterea individuala vine in completarea
            cunoasterii rationale si ne ajuta sa identificam resursele
            interioare.
          </p>
        </div>
      </section>
      <section>
        <img src="c.jpg" alt="c" />
        <div>
          <h2>Consult</h2>
          <p>
            Consultul psihologic are ca scop identificarea stării de sănătate a
            fiecărui client și propunerea unui plan de tratament potrivit. De
            asemenea presupune îndrumarea către un anumit tip de intervenție
            pentru restabilirea sănătății la acest nivel: psihoterapie sau
            tratament medicamentos, sau ambele în paralel.
          </p>
        </div>
      </section>
      <section>
        <img src="cv.jpg" alt="cv" />
        <div>
          <h2>Consiliere vocationala</h2>
          <p>
            Consilierea vocațională te ajută să descoperi cine ești, ce poți să
            faci cu abilitățile și talentele tale, cum să obții ceea ce îți
            dorești, făcând ceea ce îți place și te pasionează și construindu-ți
            astfel propriul drum.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Servicii;
