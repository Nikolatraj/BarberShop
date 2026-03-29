import "./NasTim.css";
import frizer from "@/assets/mi.png"; 

function NasTim() {
  return (
    <section className="nas-tim">
      <h2 className="nas-tim-title">NAŠ TIM</h2>

      <p className="nas-tim-text">
        Naš tim čine iskusni frizeri i stilisti posvećeni preciznim šišanjima,
        odvažnoj kreativnosti i iskrenoj brizi o svakom klijentu. Svaka poseta je
        oblikovana veštinom, preciznošću i strašću da izgledate najbolje što
        možete. Od klasičnih fade-ova do modernih stilova, prilagođavamo svaki
        detalj vašem izgledu i načinu života.
      </p>

      <div className="tim-kartice" >
        <div className="tim-kartica">
          <img src={frizer} alt="Nikola" />
          <h3>NIKOLA</h3>
          <p className="pozicija">Master Barber</p>
          <p className="iskustvo">(9+ godina iskustva)</p>
        </div>

        <div className="tim-kartica">
          <img src={frizer} alt="Nemanja" />
          <h3>NEMANJA</h3>
          <p className="pozicija">Premium Barber</p>
          <p className="iskustvo">(5+ godina iskustva)</p>
        </div>

        <div className="tim-kartica">
          <img src={frizer} alt="Ognjen" />
          <h3>OGNJEN</h3>
          <p className="pozicija">Premium Barber</p>
          <p className="iskustvo">(5+ godina iskustva)</p>
        </div>
      </div>
    </section>
  );
}

export default NasTim;