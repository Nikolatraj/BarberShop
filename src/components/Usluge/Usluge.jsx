import "./Usluge.css";
import klasicnoo from "@/assets/klasicno.png";
import brada from "@/assets/brada.png";
import fade from "@/assets/fade.png";

function Usluge() {
    return (

        <section className="usluge">

            <h2 className="usluge-title">USLUGE</h2>

         

                <div className="usluge-cards">
                    <div className="card">
                        <img src={klasicnoo} alt="Klasično šišanje" />
                        <p>KLASIČNO ŠIŠANJE</p>
                    </div>

                    <div className="card">
                        <img src={brada} alt="Sređivanje brade" />
                        <p>SREĐIVANJE BRADE</p>
                    </div>

                    <div className="card">
                        <img src={fade} alt="Fade šišanje" />
                        <p>FADE ŠIŠANJE</p>
                    </div>
                </div>

                <div className="cena">
                    <h3>CENA</h3>

                    <div className="cena-lista">
                        <div className="cena-item">
                            <span>Klasično šišanje</span>
                            <span className="linija"></span>
                            <span>(1200 - 2100 RSD)</span>
                        </div>

                        <div className="cena-item">
                            <span>Sređivanje brade</span>
                            <span className="linija"></span>
                            <span>(900 - 1600 RSD)</span>
                        </div>

                        <div className="cena-item">
                            <span>Fade šišanje</span>
                            <span className="linija"></span>
                            <span>(1400 - 2400 RSD)</span>
                        </div>

                        <div className="cena-item">
                            <span>Dečije šišanje</span>
                            <span className="linija"></span>
                            <span>(1000 - 1700 RSD)</span>
                        </div>
                    </div>
                </div>



        </section>

    )
}
export default Usluge;
