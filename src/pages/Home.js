import PageNav from "../components/PageNav";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <PageNav />
      <section>
        <container>
          <h1
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Bine ai venit la consiliere!
          </h1>
        </container>
      </section>
    </main>
  );
}
