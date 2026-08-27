import { Link } from "react-router-dom";
import "./UslugeContent.css";
import hero2 from "@/assets/hero2.png";
import klasicnoo from "@/assets/klasicno.png";
import brada from "@/assets/brada.png";
import fade from "@/assets/fade.png";

function UslugeContent() {
  return (
    <section className="booking-services-page">

      <div className="booking-services-hero">
        <h1>
          NAŠE <span>USLUGE</span>
        </h1>
        <p>Kvalitetna usluga. Precizan stil. Tvoj izgled.</p>
      </div>

      <div className="booking-services-grid">

        <div className="booking-services-card">
          <img src={klasicnoo} alt="Šišanje" />
          <div className="booking-services-info">
            <h3>ŠIŠANJE</h3>
            <p>Klasično šišanje po želji uz savete naših berbera.</p>
            <span>1.500 RSD</span>
          </div>
        </div>

        <div className="booking-services-card">
          <img src={brada} alt="Uređivanje brade" />
          <div className="booking-services-info">
            <h3>UREĐIVANJE BRADE</h3>
            <p>Oblikovanje i sređivanje brade uz toplu paru i negu.</p>
            <span>1.000 RSD</span>
          </div>
        </div>

   

        <div className="booking-services-card">
          <img src={fade} alt="Fade" />
          <div className="booking-services-info">
            <h3>FADE</h3>
            <p>Moderne fade frizure sa preciznim prelazima.</p>
            <span>1.800 RSD</span>
          </div>
        </div>

        <div className="booking-services-card">
          <img src={hero2} alt="Dečije šišanje" />
          <div className="booking-services-info">
            <h3>DEČIJE ŠIŠANJE</h3>
            <p>Strpljivo šišanje za naše najmlađe klijente.</p>
            <span>1.000 RSD</span>
          </div>
        </div>

    

      </div>

      <div className="booking-services-footer">
        <h2>SPREMAN ZA NOVI STIL?</h2>
        <p>Izaberi uslugu koja ti odgovara i zakaži svoj termin online.</p>
        <Link to="/zakazi-termin" className="header-link">  <button>Zakaži termin</button>  </Link> 
        
      </div>

    </section>
  );
}

export default UslugeContent;