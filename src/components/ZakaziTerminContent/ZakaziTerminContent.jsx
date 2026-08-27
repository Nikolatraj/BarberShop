import './ZakaziTerminContent.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { getUser, apiFetch } from "@/auth";
import { usluge, frizeri, RadnoVreme, izracunajCenu } from "@/data/salon";

function ZakaziTerminContent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFrizer, setSelectedFrizer] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedService, setSelectedService] = useState();
    const navigate = useNavigate();
    const user = getUser();

    const RezervisaniTermini = [
        new Date(2026, 1, 25), 
        new Date(2026, 1, 28), 
    ];
    
    const RezervisanaVremena = [
        { frizerId: 1, date: "2026-02-20", time: "10:00" },
        { frizerId: 1, date: "2026-02-20", time: "14:00" },
        { frizerId: 2, date: "2026-02-21", time: "11:00" },
        { frizerId: 3, date: "2026-02-20", time: "15:00" },
    ];

    const isRezervisano = (time) => {
        if (!selectedFrizer || !selectedDate) return false;
        
        const dateString = selectedDate.toISOString().split('T')[0];
        
        return RezervisanaVremena.some(reservation => 
            reservation.frizerId === selectedFrizer.id &&
            reservation.date === dateString &&
            reservation.time === time
        );
    };

    const NedostupniTermin = ({date, view}) => {
        if(view === 'month'){
            const today = new Date();
            today.setHours(0,0,0,0);
            if(date < today)
                return true;
            if(date.getDay() === 0)
                return true;
            const isRezervisanTermin = RezervisaniTermini.some(RezervisanDate => 
                RezervisanDate.toDateString() === date.toDateString());
            if (isRezervisanTermin)
                return true;
            return false;
        }
    };

    const handleBooking = async () => {

        if (!user) {
            alert('Morate biti ulogovani da biste zakazali termin');
            navigate('/login');
            return;
        }
        if (!selectedService) {
            alert('Molimo izaberite uslugu');
            return;
        }
        if (!selectedFrizer) {
            alert('Molimo izaberite frizera');
            return;
        }
        if (!selectedDate) {
            alert('Molimo izaberite datum');
            return;
        }
        if (!selectedTime) {
            alert('Molimo izaberite vreme');
            return;
        }

        let cena = selectedService.price;
        if(selectedFrizer?.id === 1){
            cena = Math.ceil(cena * 1.7 / 100)*100;
        }
        else if(selectedFrizer?.id === 2){
            cena = Math.round(cena * 1.4 / 100)*100;
        }
        else if(selectedFrizer?.id === 3){
            cena = Math.round(cena * 1 / 100)*100;
        }

        const bookingData = {
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            servicePrice: cena,
            frizerId: selectedFrizer.id,
            frizerName: selectedFrizer.name,
            datum: selectedDate.toISOString().split('T')[0],
            vreme: selectedTime
        };

        try {
            const data = await apiFetch('/zakazi-termin', {
                method: 'POST',
                body: JSON.stringify(bookingData)
            });
            
            if (data.success) {
                alert('Termin uspešno zakazan!');
                navigate('/'); 
            } else {
                alert('Greška: ' + data.message);
            }
        }   catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške pri zakazivanju');
        }
     
    };
    
    return(
        <div className='termin'>
            <div className='termin-container'>
                
                <h2>Izaberite uslugu</h2>
                <div className="usluge-container">
                   {usluge.map(usluga => {
                    const cena = izracunajCenu(usluga, selectedFrizer);
                    return (
                        <div 
                            key={usluga.id}  
                            className={`usluga ${selectedService?.id === usluga.id ? 'selected' : ''}`}
                            onClick={() => setSelectedService(usluga)}>
                            <h3>{usluga.name}</h3>
                            <p>{cena} RSD</p>
                        </div>
                    );
                   })}
                </div>

                {selectedService && (
                    <>
                        <h2>Izaberite frizera</h2>
                        <div className="frizer-container">
                           {frizeri.map(frizer => (
                            <div 
                                key={frizer.id}  
                                className={`frizer ${selectedFrizer?.id === frizer.id ? 'selected' : ''}`}
                                onClick={() => setSelectedFrizer(frizer)}>
                                <p>{frizer.name}</p>
                                <img src={frizer.img} alt={frizer.name} />
                            </div>
                           ))}
                        </div> 
                        <div className='calendar-container'>
                            <Calendar 
                                onChange={setSelectedDate} 
                                value={selectedDate}
                                tileDisabled={NedostupniTermin}
                                maxDetail="month"
                                minDetail="month"
                            />
                        </div>
                    </>
                )}
                
                {selectedService && selectedFrizer &&  (
                    <div className='radno-vreme-container'>
                        <h2>Izaberite Vreme</h2>
                        <div className='radno-vreme'>
                            {RadnoVreme.map(vreme => {
                                const rezrvisano = isRezervisano(vreme);
                                return (
                                    <button
                                        key={vreme}
                                        className={`radno-vreme-button ${selectedTime === vreme ? 'selected' : ''} ${rezrvisano ? 'rezrvisano' : ''}`}
                                        onClick={() => !rezrvisano && setSelectedTime(vreme)}
                                        disabled={rezrvisano} >
                                        {vreme}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

         
                {selectedService && selectedFrizer &&  selectedTime && (
                    <button className="potvrdi-termin-btn" onClick={handleBooking}>
                        Potvrdi Termin
                    </button>
                )}
            </div>
        </div>
        
    )
}
export default ZakaziTerminContent