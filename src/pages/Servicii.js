import PageNav from "../components/PageNav";
import styles from "./mainPages.module.css";

function Servicii() {
  return (
    <main className={styles.mainPage}>
      <PageNav />
      <section>
        <img src="ht.jpg" alt="hipnoterapie" />
        <div>
          <h2>Consiliere educationala</h2>
          <p>
            Ne dorim sa venim in ajutorul studentiilor , oferind ajutor in
            alegerea studiilor de masterat si de doctorat, dar si in alegerea
            oportunitatiilor educationale, cum ar fi stagii de practica sau
            burse in strainatate.
          </p>
        </div>
      </section>

      <section>
        <img src="c.jpg" alt="c" />
        <div>
          <h2>Consiliere psihologica</h2>
          <p>
            Dorim sa gasim solutii pentru depasirea anumitor situatii
            problematice care pot afecta orice student pe intregul parcurs al
            facultatii, luand in vedere: depasirea dificultatilor emotionale,
            suport pentru autocunoastere, managementul stresului in sesiune si
            multe altele.
          </p>
        </div>
      </section>
      <section>
        <img src="cv.jpg" alt="cv" />
        <div>
          <h2>Consiliere profesionala</h2>
          <p>
            Ne dorim sa contribuim la planificarea traseului carierei
            studentilor, concentrandu-ne pe: identificarea intereselor si
            abilitatilor profesionale prin testari specifice, asistenta in
            realizarea CV-urilor si a scrisorilor de motivatie, pregatirea
            pentru inteviuri, identificarea oportunitatiilor de dezvoltare a
            abilitatilor si competentelor necesare pe piata muncii.
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
    </main>
  );
}

export default Servicii;
