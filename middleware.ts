import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Depuración: Mostrar la ruta y la cookie
  console.log('Middleware - Ruta solicitada:', request.nextUrl.pathname);
  const authCookie = request.cookies.get('auth')?.value;
  console.log('Middleware - Cookie auth:', authCookie);

  const isLoginPage = request.nextUrl.pathname === '/login'; // Más estricto
  const isRootPath = request.nextUrl.pathname === '/';
  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');

  // Rutas públicas: solo / y /login
  const isPublicPath = isRootPath || isLoginPage;

  // Si el usuario está autenticado y accede a /login, redirigir al dashboard
  if (authCookie && isLoginPage) {
    console.log('Middleware: Usuario autenticado intenta acceder a /login, redirigiendo a /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si el usuario está autenticado y accede a la raíz, redirigir al dashboard
  if (authCookie && isRootPath) {
    console.log('Middleware: Usuario autenticado accede a la raíz, redirigiendo a /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si el usuario NO está autenticado y accede a una ruta protegida (como /dashboard), redirigir al login
  if (!authCookie && !isPublicPath) {
    console.log('Middleware: Usuario NO autenticado intenta acceder a:', request.nextUrl.pathname);
    console.log('Middleware: Redirigiendo a /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si el usuario NO está autenticado pero accede a una ruta pública, permitir acceso
  if (!authCookie && isPublicPath) {
    console.log('Middleware: Acceso permitido a ruta pública:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Si el usuario está autenticado y accede a una ruta protegida, permitir acceso
  if (authCookie && isDashboardPath) {
    console.log('Middleware: Acceso permitido a ruta protegida:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Por defecto, permitir acceso (para otras rutas públicas o casos no manejados)
  console.log('Middleware: Acceso permitido por defecto a:', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};