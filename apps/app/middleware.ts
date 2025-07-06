import { NextRequest, NextResponse } from 'next/server';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import { env } from './env';
import { internationalizationMiddleware } from '@repo/internationalization/middleware';

// --- 1. Definición de Roles ---
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

type Role = (typeof ROLES)[keyof typeof ROLES];

// --- 2. Permisos y Rutas ---
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/account': ['account:view_own'],
};

// --- 3. Redirección por Rol ---
const getDefaultRedirect = (userRole: Role, userPermissions: string[]): string => {
  if (userRole === ROLES.ADMIN) {
    return '/account';
  }

  // Por defecto, cualquier usuario autenticado puede ver su propia cuenta.
  return '/account';
};

// Rutas públicas que no requieren autenticación.
const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/api/webhooks',
  '/access-denied',
];

const AUTH_COOKIE_NAME = 'auth-token';

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
};

// --- 4. Lógica de Acceso Mejorada ---
const hasAccessToRoute = (pathname: string, userRole: Role, userPermissions: string[] = []): boolean => {
  // El Admin siempre tiene acceso a todo.
  if (userRole === ROLES.ADMIN) {
    return true;
  }

  // Encuentra la ruta base más específica que coincida con el pathname actual.
  const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
    .filter(route => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0];

  if (matchingRoute) {
    const requiredPermissions = ROUTE_PERMISSIONS[matchingRoute];
    // El usuario debe tener al menos uno de los permisos requeridos para la ruta.
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  }

  // Si está en una ruta de primer nivel pero no hay una regla definida, denegar por seguridad.
  if (!pathname.includes('/', 1)) {
    return false;
  }

  // Por defecto, permitir acceso a sub-rutas si la ruta base está permitida
  return !!matchingRoute;
};

const getUserRole = (role?: string): Role => {
  const roleStr = role?.toLowerCase();
  if (roleStr === ROLES.ADMIN) {
    return ROLES.ADMIN;
  }
  // Cualquier otro rol se considera USER.
  return ROLES.USER;
};

export function middleware(req: NextRequest) {
  const i18nResponse = internationalizationMiddleware({
    headers: req.headers,
    nextUrl: req.nextUrl,
  });
  if (i18nResponse) {
    return i18nResponse;
  }

  const { pathname } = req.nextUrl;
  const locale = pathname.match(/^\/([a-z]{2})(?:\/|$)/)?.[1] || 'es';
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

  if (isPublicRoute(pathnameWithoutLocale)) {
    return securityHeaders();
  }

  const tokenCookie = req.cookies.get(AUTH_COOKIE_NAME);
  let userId: string | undefined;
  let userRole: Role = ROLES.USER;
  let userPermissions: string[] = [];

  if (tokenCookie) {
    try {
      const token = JSON.parse(tokenCookie.value);
      userId = token.id;
      userRole = getUserRole(token.role);
      userPermissions = token.permissions || [];
    } catch (error) {
      console.error('Error parsing auth token:', error);
      // Si el token es inválido, tratar al usuario como no autenticado.
      const response = NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  // Si no hay ID de usuario y la ruta no es pública, redirigir a sign-in.
  if (!userId) {
    return NextResponse.redirect(new URL(`/${locale}/sign-in?redirect=${pathname}`, req.url));
  }

  // Si el usuario está autenticado.
  // Redirigir desde la raíz a su página por defecto.
  if (pathnameWithoutLocale === '/' || pathnameWithoutLocale === '') {
    const redirectUrl = getDefaultRedirect(userRole, userPermissions);
    return NextResponse.redirect(new URL(`/${locale}${redirectUrl}`, req.url));
  }

  // Verificar si tiene acceso a la ruta solicitada.
  if (!hasAccessToRoute(pathnameWithoutLocale, userRole, userPermissions)) {
    return NextResponse.redirect(new URL(`/${locale}/access-denied`, req.url));
  }

  return securityHeaders();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
