import "./Hero.css"
import hero1 from "@/assets/hero1.png"
import hero2 from "@/assets/hero2.png"
import { useNavigate } from "react-router-dom"


function Hero()
{
const navigate = useNavigate();


    return (
       <section className="hero">
            <div className="hero-title">
                <h1>PRAVIMO STIL,</h1>
                <h1 id="gs">GRADIMO SAMOPOUZDANJE</h1>
            </div>  
            <div className="hero-container">
                <div className="cta">   
                    <h3>Otkrij svoj stil, definišisvoj izgled, izrazi svoj karakter, poseduj svoje samopouzdanje.</h3>          
                    <button className="cta-button" onClick={() => navigate('/zakazi-termin')}>Zakaši Termin</button>   
                </div>

                <div className="slike">
                    <img src={hero1} className="hero1"></img>
                    <img src={hero2} className="hero2"></img>
                </div>
            </div>
            <hr class="line" />

       </section>
    )
}
export default Hero;
