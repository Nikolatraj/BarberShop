<?php

use App\Services\JwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/signup', function (Request $request) {
    $data = $request->all();
    $existing = DB::table('users')->where('email', $data['email'])->first();
    if ($existing) {
        return response()->json([
            'success' => false,
            'message' => 'Email već postoji!'
        ]);
    }
    DB::table('users')->insert([
        'name' => $data['ime'] . ' ' . $data['prezime'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'role' => 'klijent',
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Nalog kreiran!'
    ]);
});
Route::post('/login', function (Request $request) {
    $data = $request->all();
    $user = DB::table('users')->where('email', $data['email'])->first();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Pogrešan email ili lozinka!'
        ]);
    }
    if (!Hash::check($data['password'], $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Pogrešan email ili lozinka!'
        ]);
    }

    $token = JwtService::napravi([
        'sub'  => $user->id,
        'role' => $user->role,
    ]);
    return response()->json([
        'success' => true,
        'message' => 'Uspešno logovanje!',
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role
        ]
    ]);
});

Route::middleware('jwt')->group(function () {
    Route::get('/me', function (Request $request) {
        $user = $request->get('authUser');

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);
    });
    Route::post('/zakazi-termin', function (Request $request) {
        $data = $request->all();

        $user = $request->get('authUser');

        DB::table('appointments')->insert([
            'user_id' => $user->id,
            'created_by' => $user->id,
            'service_id' => $data['serviceId'],
            'service_name' => $data['serviceName'],
            'service_price' => $data['servicePrice'],
            'barber_id' => $data['frizerId'],
            'barber_name' => $data['frizerName'],
            'datum' => $data['datum'],
            'vreme' => $data['vreme'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Termin zakazan!'
        ]);
    });
    Route::get('/moji-termini', function (Request $request) {
        $user = $request->get('authUser');

        $termini = DB::table('appointments')
            ->leftJoin('users as autor', 'appointments.created_by', '=', 'autor.id')
            ->where('appointments.user_id', $user->id)
            ->select('appointments.*', 'autor.name as zakazao_ime', 'autor.role as zakazao_rola')
            ->orderBy('appointments.datum')
            ->orderBy('appointments.vreme')
            ->get();
        return response()->json([
            'success' => true,
            'termini' => $termini
        ]);
    });
    Route::delete('/moji-termini/{id}', function (Request $request, $id) {
        $user = $request->get('authUser');

        $termin = DB::table('appointments')->where('id', $id)->first();
        if (!$termin || $termin->user_id != $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Nemate pristup ovom terminu!'
            ], 403);
        }
        DB::table('appointments')->where('id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Termin otkazan!'
        ]);
    });
});

Route::middleware('jwt:admin')->prefix('admin')->group(function () {

    Route::get('/termini', function () {

        $termini = DB::table('appointments')
            ->leftJoin('users as klijent', 'appointments.user_id', '=', 'klijent.id')
            ->leftJoin('users as autor', 'appointments.created_by', '=', 'autor.id')
            ->select(
                'appointments.*',
                'klijent.name as klijent_ime',
                'klijent.email as klijent_email',
                'autor.name as zakazao_ime',
                'autor.role as zakazao_rola'
            )
            ->orderBy('appointments.datum')
            ->orderBy('appointments.vreme')
            ->get();
        return response()->json([
            'success' => true,
            'termini' => $termini
        ]);
    });

    Route::post('/termini', function (Request $request) {
        $data = $request->all();
        $userId = $data['userId'] ?? null;

        $klijent = DB::table('users')->where('id', $userId)->first();

        if (!$klijent) {
            return response()->json([
                'success' => false,
                'message' => 'Izaberite korisnika!'
            ], 422);
        }
        foreach (['serviceId', 'serviceName', 'servicePrice', 'frizerId', 'frizerName', 'datum', 'vreme'] as $polje) {
            if (!isset($data[$polje]) || $data[$polje] === '') {
                return response()->json([
                    'success' => false,
                    'message' => 'Popunite sva polja termina!'
                ], 422);
            }
        }
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['datum'])) {
            return response()->json([
                'success' => false,
                'message' => 'Datum nije ispravan!'
            ], 422);
        }
        if (!preg_match('/^\d{2}:\d{2}$/', $data['vreme'])) {
            return response()->json([
                'success' => false,
                'message' => 'Vreme nije ispravno!'
            ], 422);
        }
        $zauzeto = DB::table('appointments')
            ->where('barber_id', $data['frizerId'])
            ->where('datum', $data['datum'])
            ->where('vreme', $data['vreme'])
            ->exists();
        if ($zauzeto) {
            return response()->json([
                'success' => false,
                'message' => 'Taj frizer je već zauzet u to vreme!'
            ], 422);
        }
        $admin = $request->get('authUser');
        $id = DB::table('appointments')->insertGetId([
            'user_id'       => $klijent->id,
            'created_by'    => $admin->id,
            'service_id'    => $data['serviceId'],
            'service_name'  => $data['serviceName'],
            'service_price' => $data['servicePrice'],
            'barber_id'     => $data['frizerId'],
            'barber_name'   => $data['frizerName'],
            'datum'         => $data['datum'],
            'vreme'         => $data['vreme'],
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Termin zakazan!',
            'termin' => [
                'id'            => $id,
                'user_id'       => $klijent->id,
                'klijent_ime'   => $klijent->name,
                'klijent_email' => $klijent->email,
                'service_name'  => $data['serviceName'],
                'service_price' => $data['servicePrice'],
                'barber_name'   => $data['frizerName'],
                'datum'         => $data['datum'],
                'vreme'         => $data['vreme'],
                'zakazao_ime'   => $admin->name,
                'zakazao_rola'  => $admin->role,
                'created_at'    => now()->toDateTimeString(),
            ]
        ]);
    });
    Route::delete('/termini/{id}', function (Request $request, $id) {
        DB::table('appointments')->where('id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Termin obrisan!'
        ]);
    });

    Route::get('/korisnici', function () {
        $korisnici = DB::table('users')
            ->select('id', 'name', 'email', 'role')
            ->orderBy('id')
            ->get();
        return response()->json([
            'success' => true,
            'korisnici' => $korisnici
        ]);
    });

    Route::post('/korisnici', function (Request $request) {
        $data = $request->all();
        $ime      = trim($data['ime'] ?? '');
        $prezime  = trim($data['prezime'] ?? '');
        $email    = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $role     = $data['role'] ?? 'klijent';

        if ($ime === '' || $prezime === '' || $email === '' || $password === '') {
            return response()->json([
                'success' => false,
                'message' => 'Sva polja su obavezna!'
            ], 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'success' => false,
                'message' => 'Email nije ispravan!'
            ], 422);
        }
        if (strlen($password) < 6) {
            return response()->json([
                'success' => false,
                'message' => 'Lozinka mora imati bar 6 karaktera!'
            ], 422);
        }
        if (!in_array($role, ['klijent', 'admin'], true)) {
            return response()->json([
                'success' => false,
                'message' => 'Nepoznata rola!'
            ], 422);
        }
        if (DB::table('users')->where('email', $email)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Email već postoji!'
            ], 422);
        }
        $id = DB::table('users')->insertGetId([
            'name'       => $ime . ' ' . $prezime,
            'email'      => $email,
            'password'   => Hash::make($password),
            'role'       => $role,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Korisnik kreiran!',
            'korisnik' => [
                'id'    => $id,
                'name'  => $ime . ' ' . $prezime,
                'email' => $email,
                'role'  => $role,
            ]
        ]);
    });
});