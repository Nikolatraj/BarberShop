import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ZakaziTermin from "./pages/ZakaziTermin/ZakaziTermin";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
/* 

//NE RADI


 useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,        // ← Add this
      delay: 0,          // ← Add this
      easing: 'ease',    // ← Add this
    });
    
    // Force refresh after init
    AOS.refresh();
}, []);
*/
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/zakazi-termin" element={<ZakaziTermin/>} />
      </Routes>
    </>
  );
}

export default App;
