import "./Header.css";
import logo from "@/assets/logo-novi.png";
import account from "@/assets/account-beo.png";
import { Link, useNavigate  } from "react-router-dom";

function Header() {
   const navigate = useNavigate();
  return (
    <header className="header">
      <div className="left">
        <h2>Usluge</h2>
        <h2>Tim</h2>
      </div>

      <div className="center">
        <a href="/"><img id="logo" src={logo} alt="Logo"  /></a>
      </div>

      <div className="right">
       <Link to="/login"> <img id="account" src={account} alt="Account" /></Link>
        <button id="zakazi_sisanje" type="button" onClick={() => navigate('/zakazi-termin')}>Zakaži Šišanje</button>
      </div>
    </header>
  );
}

export default Header;
