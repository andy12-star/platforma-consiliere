import {useNavigate} from "react-router-dom";
import UserNav from "../components/UserNav";
import styles from "./Overview.module.css";
import {StyledButton} from "../components/styledComp";
import {useAuth} from "../services/context/AuthContext";

export default function Overview() {
  const navigate = useNavigate();
  const today = new Date();
const {user}=useAuth();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("ro-RO", options);

  const handleButtonClick = () => {
    navigate("/programare");
  };

  return (
    <main className={styles.overview}>
      <UserNav/>
      <section>
        <h2>{formattedDate}</h2>
        <container>
          <h1
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Welcome to your Dashboard!
          </h1>
        </container>
        {(user.roles[0].name === "role_patient")&& (
        <>
          <StyledButton onClick={handleButtonClick} sx={{mt: 1}}>
          Solicita o programare
        </StyledButton>
        </>
        )}

      </section>
    </main>
  );
}
