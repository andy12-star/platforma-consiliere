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
            welcome to therapy!
          </h1>
        </container>
        <h2>ceva ceva ceva</h2>
        {/*poate aici sa bagam chatul anonim?*/}
      </section>
    </main>
  );
}
