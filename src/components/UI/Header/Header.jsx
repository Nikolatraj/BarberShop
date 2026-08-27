import "./Header.css";
import logo from "@/assets/logo-novi.png";
import account from "@/assets/account-beo.png";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "@/auth";

function Header() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="left">
        <Link to="/usluge" className="header-link">
    Usluge
</Link>
          <Link to="/tim" className="header-link">
    Tim
</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="header-link">
    Admin
</Link>
        )}
        {user?.role === 'klijent' && (
          <Link to="/moji-termini" className="header-link">
    Moji termini
</Link>
        )}

      </div>

      <div className="center">
        <a href="/"><img id="logo" src={logo} alt="Logo" /></a>
      </div>

      <div className="right">
        {user ? (
          <button id="odjavi_se" type="button" onClick={handleLogout}>Odjavi se</button>
        ) : (
          <Link to="/login"> <img id="account" src={account} alt="Account" /></Link>
        )}
        <button id="zakazi_sisanje" type="button" onClick={() => navigate('/zakazi-termin')}>Zakaži Šišanje</button>
      </div>
    </header>
  );
}

export default Header;
