const API = 'http://localhost:8000/api';

export function getUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
}

export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export function readToken(token = getToken()) {
    if (!token) return null;

    try {
        const payload = token.split('.')[1];

        return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
        return null;
    }
}

export function isLoggedIn() {
    const payload = readToken();

    return !!payload && payload.exp * 1000 > Date.now();
}

export async function apiFetch(putanja, opcije = {}) {
    const token = getToken();

    const response = await fetch(API + putanja, {
        ...opcije,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...opcije.headers,
        },
    });

    if (response.status === 401) {
        logout();
        window.location.href = '/login';

        throw new Error('Sesija je istekla, prijavite se ponovo.');
    }

    return response.json();
}
