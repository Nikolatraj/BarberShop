<?php

namespace App\Http\Middleware;

use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class JwtAuth
{
    public function handle(Request $request, Closure $next, ?string $rola = null): Response
    {
        $token = $request->bearerToken();
        $payload = JwtService::procitaj($token);
        if (!$payload) {
            return response()->json([
                'success' => false,
                'message' => 'Niste ulogovani ili je sesija istekla!'
            ], 401);
        }

        $user = DB::table('users')->where('id', $payload['sub'] ?? null)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Korisnik ne postoji!'
            ], 401);
        }

        if ($rola && $user->role !== $rola) {
            return response()->json([
                'success' => false,
                'message' => 'Nemate pristup!'
            ], 403);
        }

        $request->attributes->set('authUser', $user);
        return $next($request);
    }
}