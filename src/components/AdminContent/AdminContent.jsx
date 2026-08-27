import { useEffect, useState } from "react";
import "./AdminContent.css";
import { getUser, apiFetch } from "@/auth";
import { usluge, frizeri, RadnoVreme, izracunajCenu, formatirajVreme } from "@/data/salon";

function AdminContent() {
  const [termini, setTermini] = useState([]);
  const [korisnici, setKorisnici] = useState([]);
  const user = getUser();

  const prazanForma = { ime: '', prezime: '', email: '', password: '', role: 'klijent' };
  const [noviKorisnik, setNoviKorisnik] = useState(prazanForma);
  const [salje, setSalje] = useState(false);

  const prazanTermin = { userId: '', serviceId: '', frizerId: '', datum: '', vreme: '' };
  const [noviTermin, setNoviTermin] = useState(prazanTermin);
  const [saljeTermin, setSaljeTermin] = useState(false);

  const izabranaUsluga = usluge.find(u => u.id === Number(noviTermin.serviceId));
  const izabraniFrizer = frizeri.find(f => f.id === Number(noviTermin.frizerId));
  const cena = izracunajCenu(izabranaUsluga, izabraniFrizer);

  useEffect(() => {
    const ucitajPodatke = async () => {
      try {
        const terminiData = await apiFetch('/admin/termini');
        const korisniciData = await apiFetch('/admin/korisnici');

        if (terminiData.success && korisniciData.success) {
          setTermini(terminiData.termini);
          setKorisnici(korisniciData.korisnici);
        } else {
          alert('Greška: ' + terminiData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Došlo je do greške pri učitavanju podataka');
      }
    };

    ucitajPodatke();
  }, [user.id]);

  const obrisiTermin = async (id) => {
    try {
      const data = await apiFetch(`/admin/termini/${id}`, { method: 'DELETE' });

      if (data.success) {
        setTermini(termini.filter(termin => termin.id !== id));
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške pri brisanju termina');
    }
  };

  const promeniPolje = (e) => {
    setNoviKorisnik({ ...noviKorisnik, [e.target.name]: e.target.value });
  };

  const dodajKorisnika = async (e) => {
    e.preventDefault();

    setSalje(true);

    try {
      const data = await apiFetch('/admin/korisnici', {
        method: 'POST',
        body: JSON.stringify(noviKorisnik)
      });

      if (data.success) {
        setKorisnici([...korisnici, data.korisnik]);
        setNoviKorisnik(prazanForma);
        alert('Korisnik je dodat!');
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške pri dodavanju korisnika');
    } finally {
      setSalje(false);
    }
  };

  const promeniPoljeTermina = (e) => {
    setNoviTermin({ ...noviTermin, [e.target.name]: e.target.value });
  };

  const zakaziZaKorisnika = async (e) => {
    e.preventDefault();

    setSaljeTermin(true);

    try {
      const data = await apiFetch('/admin/termini', {
        method: 'POST',
        body: JSON.stringify({
          userId: Number(noviTermin.userId),
          serviceId: izabranaUsluga.id,
          serviceName: izabranaUsluga.name,
          servicePrice: cena,
          frizerId: izabraniFrizer.id,
          frizerName: izabraniFrizer.name,
          datum: noviTermin.datum,
          vreme: noviTermin.vreme
        })
      });

      if (data.success) {
        setTermini([...termini, data.termin]);
        setNoviTermin(prazanTermin);
        alert('Termin je zakazan!');
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške pri zakazivanju termina');
    } finally {
      setSaljeTermin(false);
    }
  };

  return (
    <section className="admin-section">

      <div className="admin-header">
        <h1>
          ADMIN <span>PANEL</span>
        </h1>
        <p>Pregled svih zakazanih termina i registrovanih korisnika.</p>
      </div>

      <div className="admin-statistika">
        <div className="admin-kartica">
          <h3>{termini.length}</h3>
          <p>Zakazanih termina</p>
        </div>
        <div className="admin-kartica">
          <h3>{korisnici.length}</h3>
          <p>Registrovanih korisnika</p>
        </div>
      </div>

      <h2>TERMINI</h2>

      <form className="admin-forma" onSubmit={zakaziZaKorisnika}>
        <h3>Zakaži termin u ime korisnika</h3>

        <div className="admin-forma-polja">
          <select name="userId" required value={noviTermin.userId} onChange={promeniPoljeTermina}>
            <option value="">Izaberite korisnika</option>
            {korisnici.map(korisnik => (
              <option key={korisnik.id} value={korisnik.id}>
                {korisnik.name} ({korisnik.email})
              </option>
            ))}
          </select>

          <select name="serviceId" required value={noviTermin.serviceId} onChange={promeniPoljeTermina}>
            <option value="">Izaberite uslugu</option>
            {usluge.map(usluga => (
              <option key={usluga.id} value={usluga.id}>{usluga.name}</option>
            ))}
          </select>

          <select name="frizerId" required value={noviTermin.frizerId} onChange={promeniPoljeTermina}>
            <option value="">Izaberite frizera</option>
            {frizeri.map(frizer => (
              <option key={frizer.id} value={frizer.id}>{frizer.name}</option>
            ))}
          </select>

          <select name="vreme" required value={noviTermin.vreme} onChange={promeniPoljeTermina}>
            <option value="">Izaberite vreme</option>
            {RadnoVreme.map(vreme => (
              <option key={vreme} value={vreme}>{vreme}</option>
            ))}
          </select>

          <input
            type="date"
            name="datum"
            required
            value={noviTermin.datum}
            onChange={promeniPoljeTermina}
          />

          <div className="admin-cena">
            {izabranaUsluga && izabraniFrizer ? `Cena: ${cena} RSD` : 'Cena se računa po frizeru'}
          </div>

          <button className="admin-dodaj-btn" type="submit" disabled={saljeTermin}>
            {saljeTermin ? 'Zakazujem...' : 'Zakaži termin'}
          </button>
        </div>
      </form>

      {termini.length === 0 ? (
        <p className="admin-prazno">Nema zakazanih termina.</p>
      ) : (
        <table className="admin-tabela">
          <thead>
            <tr>
              <th>Klijent</th>
              <th>Email</th>
              <th>Usluga</th>
              <th>Frizer</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Cena</th>
              <th>Zakazao</th>
              <th>Kada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {termini.map(termin => (
              <tr key={termin.id}>
                <td>{termin.klijent_ime ?? 'Nepoznat'}</td>
                <td>{termin.klijent_email ?? '-'}</td>
                <td>{termin.service_name}</td>
                <td>{termin.barber_name}</td>
                <td>{termin.datum}</td>
                <td>{termin.vreme}</td>
                <td>{termin.service_price} RSD</td>
                <td>
                  {termin.zakazao_ime
                    ? <>
                        {termin.zakazao_ime}
                        {termin.zakazao_rola === 'admin' && <span className="admin-oznaka">admin</span>}
                      </>
                    : '—'}
                </td>
                <td>{formatirajVreme(termin.created_at)}</td>
                <td>
                  <button className="admin-obrisi-btn" onClick={() => obrisiTermin(termin.id)}>Obriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>KORISNICI</h2>

      <form className="admin-forma" onSubmit={dodajKorisnika}>
        <h3>Dodaj novog korisnika</h3>

        <div className="admin-forma-polja">
          <input
            type="text"
            name="ime"
            placeholder="Ime"
            required
            value={noviKorisnik.ime}
            onChange={promeniPolje}
          />
          <input
            type="text"
            name="prezime"
            placeholder="Prezime"
            required
            value={noviKorisnik.prezime}
            onChange={promeniPolje}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={noviKorisnik.email}
            onChange={promeniPolje}
          />
          <input
            type="password"
            name="password"
            placeholder="Lozinka (min. 6 karaktera)"
            required
            minLength={6}
            value={noviKorisnik.password}
            onChange={promeniPolje}
          />
          <select name="role" value={noviKorisnik.role} onChange={promeniPolje}>
            <option value="klijent">Klijent</option>
            <option value="admin">Admin</option>
          </select>

          <button className="admin-dodaj-btn" type="submit" disabled={salje}>
            {salje ? 'Dodajem...' : 'Dodaj korisnika'}
          </button>
        </div>
      </form>

      <table className="admin-tabela">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {korisnici.map(korisnik => (
            <tr key={korisnik.id}>
              <td>{korisnik.name}</td>
              <td>{korisnik.email}</td>
              <td>
                <span className={`admin-rola ${korisnik.role}`}>{korisnik.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
}

export default AdminContent;
