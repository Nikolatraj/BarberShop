# BarberShop

Web aplikacija za frizerski salon — klijenti zakazuju termine online, a admin ih pregleda i upravlja njima.

React (Vite) frontend + Laravel REST API backend.

## Funkcionalnosti

**Klijent**
- Registracija i prijava
- Pregled usluga i tima frizera
- Zakazivanje termina (izbor usluge, frizera, datuma i vremena)
- Pregled i otkazivanje sopstvenih termina

**Admin**
- Pregled svih zakazanih termina sa podacima o klijentu
- Brisanje bilo kog termina
- Pregled svih registrovanih korisnika

## Tehnologije

| Deo | Stack |
|---|---|
| Frontend | React 19, React Router 7, Vite 7, AOS, FontAwesome |
| Backend | Laravel, SQLite |
| Autentikacija | JWT (HS256) |

## Struktura

```
.
├── src/                  # React aplikacija
│   ├── components/       # UI komponente (Header, Footer, forme, sadržaj stranica)
│   ├── pages/            # Stranice povezane sa rutama
│   ├── data/salon.js     # Usluge, frizeri, radno vreme i računanje cene
│   └── auth.js           # Token, sesija korisnika i apiFetch
├── public/               # Statički fajlovi i slike
└── backend-laravel/      # Laravel API
    ├── routes/api.php                     # Svi API endpointi
    ├── app/Services/JwtService.php        # Pravljenje i provera JWT tokena
    ├── app/Http/Middleware/JwtAuth.php    # Zastita ruta i provera role
    ├── database/migrations/               # Migracije (ukljucujuci created_by)
    ├── config/jwt.php                     # Tajni kljuc i trajanje tokena
    └── database/                          # Migracije i seeder-i
```

## Pokretanje

### Backend

```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API radi na `http://localhost:8000`.

### Frontend

U drugom terminalu, iz korena projekta:

```bash
npm install
npm run dev
```

Aplikacija radi na `http://localhost:5173`.

## API endpointi

| Metoda | Putanja | Pristup | Opis |
|---|---|---|---|
| POST | `/api/signup` | javno | Registracija klijenta |
| POST | `/api/login` | javno | Prijava, vraća JWT token |
| GET | `/api/me` | token | Podaci o ulogovanom korisniku |
| POST | `/api/zakazi-termin` | token | Zakazivanje termina |
| GET | `/api/moji-termini` | token | Termini ulogovanog klijenta |
| DELETE | `/api/moji-termini/{id}` | token | Klijent otkazuje svoj termin |
| GET | `/api/admin/termini` | token + admin | Svi termini |
| POST | `/api/admin/termini` | token + admin | Admin zakazuje termin u ime korisnika |
| DELETE | `/api/admin/termini/{id}` | token + admin | Admin briše termin |
| GET | `/api/admin/korisnici` | token + admin | Svi korisnici |
| POST | `/api/admin/korisnici` | token + admin | Admin dodaje novog korisnika |

## Autentikacija

Posle uspešnog logovanja backend vraća JWT token, koji frontend čuva u
`localStorage` i šalje uz svaki naredni zahtev:

```
Authorization: Bearer <token>
```

## Evidencija termina

Tabela `appointments` pamti dve različite stvari:

| Kolona | Značenje |
|---|---|
| `user_id` | za koga je termin |
| `created_by` | ko ga je zakazao (klijent sam, ili admin umesto njega) |
| `created_at` | kada je zakazan |

Admin panel prikazuje kolone **Zakazao** i **Kada**, a klijent na svojoj strani
vidi kada je termin zakazan i da li mu ga je zakazao salon. Termini napravljeni
pre uvođenja ove evidencije nemaju te podatke i prikazuju se kao `—`.

Token je potpisan HS256 algoritmom tajnim ključem iz `.env` (`JWT_SECRET`) i
podrazumevano važi 1 sat (`JWT_TTL`). Rute su zaštićene middleware-om:
`->middleware('jwt')` traži validan token, `->middleware('jwt:admin')` traži
validan token i `admin` rolu. `userId` se nikada ne uzima iz zahteva nego
isključivo iz tokena.

## Admin nalog

Nakon migracija, admin se pravi tako što se korisniku u tabeli `users` postavi `role` na `admin`:

```bash
php artisan tinker
>>> DB::table('users')->where('email', 'tvoj@email.com')->update(['role' => 'admin']);
```

## Napomene

- `backend-laravel/.env` nije u repozitorijumu. Koristi `.env.example` kao osnovu i obavezno postavi `JWT_SECRET` (npr. `php -r "echo base64_encode(random_bytes(32));"`).
- Ovo je studentski/portfolio projekat. JWT je implementiran ručno da bi se videlo kako token radi iznutra; za produkciju bi se koristio Laravel Sanctum ili `firebase/php-jwt`, uz slanje tokena preko HTTPS-a.
