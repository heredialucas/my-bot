import { NextRequest, NextResponse } from 'next/server';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import { env } from './env';
import { internationalizationMiddleware } from '@repo/internationalization/middleware';

// --- 1. Definición de Roles ---
// Roles claros y específicos para el sistema de pedidos.
const ROLES = {
  ADMIN: 'admin',
  SELLER: 'seller',
} as const;

type Role = (typeof ROLES)[keyof typeof ROLES];

// --- 2. Permisos y Rutas ---
// Mapa detallado de rutas y los permisos necesarios para acceder a ellas.
// Soporta rutas base (ej. '/clients') para cubrir sub-rutas (ej. '/clients/new').
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  // Rutas con permisos específicos de visualización
  '/account': ['account:view_own'],
  '/clients': ['clients:view'],
  '/products': ['products:view'],
  '/inventory': ['inventory:view'],
  '/payments': ['payments:view'],
  '/analytics': ['analytics:view_global'],

  // La ruta de pedidos permite el acceso si el usuario puede ver sus propios pedidos O todos los pedidos.
  // La lógica en `hasAccessToRoute` maneja este caso (usando .some()).
  '/orders': ['orders:view_own', 'orders:view_all'],

  // La gestión de usuarios está dentro de 'account', pero si tuviera su propia página, este sería el permiso.
  '/users': ['account:manage_users'],
};

// --- 3. Redirección por Rol ---
// Lógica mejorada para dirigir a los usuarios a la página más útil después de iniciar sesión.
const getDefaultRedirect = (userRole: Role, userPermissions: string[]): string => {
  if (userRole === ROLES.ADMIN) {
    return '/account'; // El Admin siempre va al dashboard principal.
  }

  // Lógica de redirección para Vendedores (Sellers)
  if (userPermissions.includes('orders:create')) {
    return '/orders/new'; // Prioridad 1: Si puede crear pedidos, llevarlo allí.
  }
  if (userPermissions.includes('orders:view_own')) {
    return '/orders'; // Prioridad 2: Ver sus pedidos.
  }
  if (userPermissions.includes('clients:view')) {
    return '/clients'; // Prioridad 3: Ver sus clientes.
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
// Función robusta para verificar permisos que entiende sub-rutas.
const hasAccessToRoute = (pathname: string, userRole: Role, userPermissions: string[] = []): boolean => {
  // El Admin siempre tiene acceso a todo.
  if (userRole === ROLES.ADMIN) {
    return true;
  }

  // Encuentra la ruta base más específica que coincida con el pathname actual.
  // Ej: para '/clients/123/edit', encontrará la regla de '/clients'.
  const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
    .filter(route => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0];

  if (matchingRoute) {
    const requiredPermissions = ROUTE_PERMISSIONS[matchingRoute];
    // El usuario debe tener al menos uno de los permisos requeridos para la ruta.
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  }

  // Si está en una ruta de primer nivel pero no hay una regla definida, denegar por seguridad.
  // Esto previene el acceso a rutas como /settings si no se definen explícitamente.
  if (!pathname.includes('/', 1)) {
    return false;
  }

  // Por defecto, permitir acceso a sub-rutas si la ruta base está permitida
  // (ej. /clients/123). La protección debe ser a nivel de página/componente.
  return !!matchingRoute;
};

const getUserRole = (role?: string): Role => {
  const roleStr = role?.toLowerCase();
  if (roleStr === ROLES.ADMIN) {
    return ROLES.ADMIN;
  }
  // Cualquier otro rol (o si no se especifica) se considera SELLER.
  return ROLES.SELLER;
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
  let userRole: Role = ROLES.SELLER;
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
