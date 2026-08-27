import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ZakaziTermin from "./pages/ZakaziTermin/ZakaziTermin";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UslugePage from "./pages/UslugePage/UslugePage";
import TimPage from "./pages/TimPage/TimPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MojiTermini from "./pages/MojiTermini/MojiTermini";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/zakazi-termin" element={<ZakaziTermin/>} />
        <Route path="/usluge" element={<UslugePage/>}/>
        <Route path="/tim" element={<TimPage/>}/>
        <Route path="/moji-termini" element={<ProtectedRoute><MojiTermini/></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
