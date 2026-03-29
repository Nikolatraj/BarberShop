<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/zakazi-termin', function (Request $request) {
    $data = $request->all();
    
    \Log::info('Received booking:', $data);

    DB::table('appointments')->insert([
        'service_id' => $data['serviceId'],
        'service_name' => $data['serviceName'],
        'service_price' => $data['servicePrice'],
        'barber_id' => $data['frizerId'],
        'barber_name' => $data['frizerName'],
        'datum' => $data['datum'],
        'vreme' => $data['vreme'],
     
    ]);
    return response()->json([
        'success' => true,
        'message' => 'Termin zakazan!'
    ]);
});

Route::post('/signup', function (Request $request) {
    $data = $request->all();
    
    // proveravamo da li postoji neko sa ovim emaiom
    $existing = DB::table('users')->where('email', $data['email'])->first();

    // ako posotji izbaci mu gresku
    if ($existing) {
        return response()->json([
            'success' => false,
            'message' => 'Email već postoji!'
        ]);
    }
    
    // ubacujemo korisnika u tabelu
    DB::table('users')->insert([
        'name' => $data['ime'] . ' ' . $data['prezime'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),  // skriva password!
        
    ]);
    
    return response()->json([
        'success' => true,
        'message' => 'Nalog kreiran!'
    ]);
});

Route::post('/login', function(Request $request){
    $data = $request->all();

    // trazimo korisnika sa emailom
    $user = DB::table('users')->where('email', $data['email'])->first();


    // proveravamo da li postoji korisnik
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Pogrešan email ili lozinka!'
        ]);
    }

    // proveravamo da li postoji sifra
    if (!Hash::check($data['password'], $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Pogrešan email ili lozinka!'
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Uspešno logovanje!',
        'user' => [
            'name' => $user->name,
            'email' => $user->email
        ]
    ]);
});