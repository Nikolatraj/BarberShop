import { Link } from "react-router-dom";
import "./TimContent.css";
import hero2 from "@/assets/hero2.png";

function TimContent() {
  return (
    <section className="team-section">

      <div className="team-header">
        <h1>
          NAŠ <span>TIM</span>
        </h1>
        <p>
          Iskusni berberi koji će se pobrinuti da svaki detalj bude savršen.
        </p>
      </div>

      <div className="team-container">

        <div className="team-card">
          <img src={hero2} alt="hero2" />

          <div className="team-card-content">
            <h3>OGNJEN</h3>
            <h4>Premium Barber</h4>

            <p>
              Specijalista za moderne fade frizure i precizno oblikovanje brade.
              Dugogodišnje iskustvo i besprekorna pažnja prema detaljima.
            </p>
          </div>
        </div>

        <div className="team-card">
          <img src={hero2} alt="hero2" />

          <div className="team-card-content">
            <h3>NEMANJA</h3>
            <h4>Premium Barber</h4>

            <p>
              Kreativan pristup svakom klijentu uz kombinaciju klasičnih i
              modernih stilova šišanja.
            </p>
          </div>
        </div>

        <div className="team-card">
          <img src={hero2} alt="hero2" />

          <div className="team-card-content">
            <h3>NIKOLA</h3>
            <h4>Master Barber</h4>

            <p>
              Posvećen savršenom izgledu svakog klijenta. Preciznost, stil i
              profesionalan pristup u svakom terminu.
            </p>
          </div>
        </div>

      </div>

      <div className="team-cta">
        <h2>IZABERI SVOG BERBERA</h2>

        <p>
          Upoznaj naš tim i zakaži termin kod člana koji najbolje odgovara tvom
          stilu.
        </p>

        <Link to="/zakazi-termin" className="header-link">  <button>Zakaži termin</button>  </Link> 
      </div>

    </section>
    
  );
}

export default TimContent;

