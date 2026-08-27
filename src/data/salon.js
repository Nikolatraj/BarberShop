import mi from "@/assets/mi.png";


export const usluge = [
    { id: 1, name: "Klasično šišanje", price: 1200 },
    { id: 2, name: "Sređivanje brade", price: 900 },
    { id: 3, name: "Fade šišanje", price: 1400 },
    { id: 4, name: "Dečije šišanje", price: 1000 }
];

export const frizeri = [
    { id: 1, name: "Nikola", img: mi },
    { id: 2, name: "Nemanja", img: mi },
    { id: 3, name: "Ognjen", img: mi }
];

export const RadnoVreme = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
];

export function izracunajCenu(usluga, frizer) {
    if (!usluga) return 0;

    const cena = usluga.price;

    if (frizer?.id === 1) {
        return Math.ceil(cena * 1.7 / 100) * 100;
    }
    if (frizer?.id === 2) {
        return Math.round(cena * 1.4 / 100) * 100;
    }
    if (frizer?.id === 3) {
        return Math.round(cena * 1 / 100) * 100;
    }

    return cena;
}

export function formatirajVreme(vrednost) {
    if (!vrednost) return '—';

    const d = new Date(vrednost.replace(' ', 'T'));

    if (isNaN(d)) return '—';

    const dvocifreno = (n) => String(n).padStart(2, '0');

    return `${dvocifreno(d.getDate())}.${dvocifreno(d.getMonth() + 1)}.${d.getFullYear()}. u ${dvocifreno(d.getHours())}:${dvocifreno(d.getMinutes())}`;
}
