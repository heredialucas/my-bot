import { NextRequest, NextResponse } from 'next/server';

// Este middleware se ejecutará en todas las rutas dentro de (authenticated)
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Si estamos en la raíz de authenticated, redirigimos según el rol
  // En una app real, esto verificaría el rol del usuario en la sesión
  if (pathname === '/') {
    // Para demostración: redireccionar a admin
    // En una app real, verificaríamos el rol del usuario
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Si estamos en /admin, /accountant o /client, permitimos el acceso
  // En una app real, verificaríamos si el usuario tiene ese rol
  if (
    pathname.startsWith('/admin') || 
    pathname.startsWith('/accountant') || 
    pathname.startsWith('/client')
  ) {
    return NextResponse.next();
  }

  // Si el usuario intenta acceder a alguna otra ruta dentro de authenticated
  // pero no tiene un rol específico en la URL, redirigimos a la raíz
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas dentro de (authenticated)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 