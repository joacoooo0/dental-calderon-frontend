'use client';

import Cookies from 'js-cookie';

interface Admin {
  id_admin: number;
  userAdmin: string;
}

interface AuthData {
  admin: Admin;
}

export function login(userData: AuthData & { token?: string }): void {
  Cookies.set('auth', JSON.stringify(userData), {
    expires: 1,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  });
  if (userData.token) {
    localStorage.setItem('token', userData.token); // CAMBIO AQUÍ
  }
  console.log('Cookie auth seteada:', Cookies.get('auth'));
}

export function logout(): void {
  console.log('Cookie auth antes de eliminar:', Cookies.get('auth'));
  Cookies.remove('auth', { path: '/' });
  localStorage.removeItem('token'); // CAMBIO AQUÍ
  console.log('Cookie auth después de eliminar:', Cookies.get('auth'));
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const authCookie = Cookies.get('auth');
    console.log('Verificando autenticación - Cookie auth:', authCookie);
    return !!authCookie;
  }
  return false;
}

export function getUser(): AuthData | null {
  if (typeof window !== 'undefined') {
    const authData = Cookies.get('auth');
    return authData ? JSON.parse(authData) : null;
  }
  return null;
}

export function getUserFromCookie(cookie: string | undefined): AuthData | null {
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch (error) {
    return null;
  }
}