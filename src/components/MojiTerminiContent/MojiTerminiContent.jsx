import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MojiTerminiContent.css";
import { getUser, apiFetch } from "@/auth";
import { formatirajVreme } from "@/data/salon";

function MojiTerminiContent() {
  const [termini, setTermini] = useState([]);
  const user = getUser();

  useEffect(() => {
    const ucitajTermine = async () => {
      try {
        const data = await apiFetch('/moji-termini');

        if (data.success) {
          setTermini(data.termini);
        } else {
          alert('Greška: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Došlo je do greške pri učitavanju termina');
      }
    };

    ucitajTermine();
  }, [user.id]);

  const otkaziTermin = async (id) => {
    try {
      const data = await apiFetch(`/moji-termini/${id}`, { method: 'DELETE' });

      if (data.success) {
        setTermini(termini.filter(termin => termin.id !== id));
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške pri otkazivanju termina');
    }
  };

  return (
    <section className="moji-termini-section">

      <div className="moji-termini-header">
        <h1>
          MOJI <span>TERMINI</span>
        </h1>
        <p>Zdravo {user.name}, ovde su svi termini koje si zakazao.</p>
      </div>

      {termini.length === 0 ? (
        <div className="moji-termini-prazno">
          <h2>NEMAŠ ZAKAZANIH TERMINA</h2>
          <p>Izaberi uslugu i frizera i rezerviši svoj prvi termin.</p>
          <Link to="/zakazi-termin" className="header-link">  <button>Zakaži termin</button>  </Link>
        </div>
      ) : (
        <div className="moji-termini-lista">
          {termini.map(termin => (
            <div className="moji-termini-kartica" key={termin.id}>
              <div className="moji-termini-info">
                <h3>{termin.service_name}</h3>
                <h4>{termin.barber_name}</h4>
                <p>{termin.datum} u {termin.vreme}</p>
                <small>
                  Zakazano {formatirajVreme(termin.created_at)}
                  {termin.zakazao_rola === 'admin' && ' — zakazao salon'}
                </small>
              </div>

              <div className="moji-termini-desno">
                <span>{termin.service_price} RSD</span>
                <button onClick={() => otkaziTermin(termin.id)}>Otkaži</button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}

export default MojiTerminiContent;
