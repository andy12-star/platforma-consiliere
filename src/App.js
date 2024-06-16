import {BrowserRouter, Route, Routes} from "react-router-dom";
import Contact from "./pages/Contact";
import Servicii from "./pages/Servicii";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Verificare from "./pages/Verificare";
import Register from "./pages/Register";
import {AuthProvider} from "./services/context/AuthContext";
import Overview from "./pages/Overview";
import Programare from "./pages/Programare";
import Programari from "./pages/Programari";
import RaportConsultatie from "./pages/RaportConsultatie";
import TestSMI from "./pages/TestSMI";
import TestYSQ from "./pages/TestYSQ";
import TestPersonalitate from "./pages/TestPersonalitate";
import RezultateTeste from "./pages/RezultateTeste";
import Notite from "./pages/Notite";
import Profil from "./pages/Profil";
import Pacienti from "./pages/Pacienti";
import Rapoarte from "./pages/Rapoarte";
import PatientDetails from "./pages/PacientDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ModifyAppt from "./pages/ModifyAppt";
import ModifyConsult from "./pages/ModifyConsult";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="servicii" element={<Servicii/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="app" element={<AppLayout/>}/>
            <Route path="*" element={<PageNotFound/>}/>
            <Route path="verificare" element={<Verificare/>}/>
            <Route path="overview" element={<ProtectedRoute><Overview/></ProtectedRoute>}/>
            <Route path="programare" element={<ProtectedRoute><Programare/></ProtectedRoute>}/>
            <Route path="programari" element={<ProtectedRoute><Programari/></ProtectedRoute>}/>
            <Route path="rapoarteconsultatie" element={<ProtectedRoute><RaportConsultatie/></ProtectedRoute>}/>
            <Route path="testsmi" element={<ProtectedRoute><TestSMI/></ProtectedRoute>}/>
            <Route path="testysq" element={<ProtectedRoute><TestYSQ/></ProtectedRoute>}/>
            <Route path="testpersonalitate" element={<ProtectedRoute><TestPersonalitate/></ProtectedRoute>}/>
            <Route path="rezultateteste" element={<ProtectedRoute><RezultateTeste/></ProtectedRoute>}/>
            <Route path="notite" element={<ProtectedRoute><Notite/></ProtectedRoute>}/>
            <Route path="profil" element={<ProtectedRoute><Profil/></ProtectedRoute>}/>
            <Route path="pacienti" element={<ProtectedRoute><Pacienti/></ProtectedRoute>}/>
            <Route path="rapoarte" element={<ProtectedRoute><Rapoarte/></ProtectedRoute>}/>
            <Route path="patient-details/:id" element={<ProtectedRoute><PatientDetails/></ProtectedRoute>}/>
            <Route path="/modifica-programare" element={<ModifyAppt />} />
            <Route path="/modifica-consultatie" element={<ModifyConsult />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
