<?php

namespace App\Services;

class JwtService
{
    public static function napravi(array $podaci): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $sada = time();
        $payload = array_merge($podaci, [
            'iat' => $sada,
            'exp' => $sada + (int) config('jwt.ttl'),
        ]);
        $headerDeo  = self::base64UrlEncode(json_encode($header));
        $payloadDeo = self::base64UrlEncode(json_encode($payload));
        $potpis     = self::potpisi($headerDeo . '.' . $payloadDeo);

        return $headerDeo . '.' . $payloadDeo . '.' . $potpis;
    }
    public static function procitaj(?string $token): ?array
    {
        if (!$token) {
            return null;
        }
        $delovi = explode('.', $token);
        if (count($delovi) !== 3) {
            return null;
        }
        [$headerDeo, $payloadDeo, $potpis] = $delovi;
        $ocekivaniPotpis = self::potpisi($headerDeo . '.' . $payloadDeo);

        if (!hash_equals($ocekivaniPotpis, $potpis)) {
            return null;
        }

        $header = json_decode(self::base64UrlDecode($headerDeo), true);
        if (!is_array($header) || ($header['alg'] ?? null) !== 'HS256') {
            return null;
        }
        $payload = json_decode(self::base64UrlDecode($payloadDeo), true);

        if (!is_array($payload)) {
            return null;
        }

        if (!isset($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }
        return $payload;
    }
    private static function potpisi(string $tekst): string
    {
        $kljuc = (string) config('jwt.secret');
        return self::base64UrlEncode(hash_hmac('sha256', $tekst, $kljuc, true));
    }

    private static function base64UrlEncode(string $tekst): string
    {
        return rtrim(strtr(base64_encode($tekst), '+/', '-_'), '=');
    }
    private static function base64UrlDecode(string $tekst): string
    {
        return (string) base64_decode(strtr($tekst, '-_', '+/'));
    }
}