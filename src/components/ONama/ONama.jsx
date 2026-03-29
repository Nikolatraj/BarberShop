import "./ONama.css";
import slika1 from "@/assets/hero2.png"

function ONama()
{
   
  
    return (
        <section className="oNama">
            <div className="oNama-title">
                <h1>Stil sa <span id="plava">razlogom,</span></h1>
                <h1>Briga o svakom gostu.</h1>
                </div>  
            <div className="oNama-text" >
                <p>Online barber je osnovan sa idejom da pruži vrhunsku negu kose uz lični pristup. Spajamo tradicionalnu berbersku veštinu sa savremenim idejama, čineći svaku posetu opuštajućom i prijatnom.</p>
            </div>
            <div className="oNama-slika" >
                <img src={slika1} className="slika1" ></img>
            </div>
        </section>
    )
}   
export default ONama;
