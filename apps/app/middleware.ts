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
// Soporta rutas base (ej. '/admin/clients') para cubrir sub-rutas (ej. '/admin/clients/new').
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  // Rutas de Vendedor y Admin
  '/admin/account': ['account:view_own'],
  '/admin/orders': ['orders:view_own', 'orders:view_all'],
  '/admin/clients': ['clients:view', 'clients:create', 'clients:edit'],

  // Rutas exclusivas de Admin
  '/admin/analytics': ['analytics:view_global'],
  '/admin/products': ['products:view', 'products:create', 'products:edit'],
  '/admin/inventory': ['inventory:view', 'inventory:assign'],
  '/admin/users': ['users:view', 'users:manage'],
};

// --- 3. Redirección por Rol ---
// Lógica mejorada para dirigir a los usuarios a la página más útil después de iniciar sesión.
const getDefaultRedirect = (userRole: Role, userPermissions: string[]): string => {
  if (userRole === ROLES.ADMIN) {
    return '/admin/account'; // El Admin siempre va al dashboard principal.
  }

  // Lógica de redirección para Vendedores (Sellers)
  if (userPermissions.includes('orders:create')) {
    return '/admin/orders/new'; // Prioridad 1: Si puede crear pedidos, llevarlo allí.
  }
  if (userPermissions.includes('orders:view_own')) {
    return '/admin/orders'; // Prioridad 2: Ver sus pedidos.
  }
  if (userPermissions.includes('clients:view')) {
    return '/admin/clients'; // Prioridad 3: Ver sus clientes.
  }

  // Por defecto, cualquier usuario autenticado puede ver su propia cuenta.
  return '/admin/account';
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
  // Ej: para '/admin/clients/123/edit', encontrará la regla de '/admin/clients'.
  const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
    .filter(route => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0];

  if (matchingRoute) {
    const requiredPermissions = ROUTE_PERMISSIONS[matchingRoute];
    // El usuario debe tener al menos uno de los permisos requeridos para la ruta.
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  }

  // Si está en /admin pero no hay una regla definida, se deniega el acceso por seguridad.
  if (pathname.startsWith('/admin')) {
    return false;
  }

  // Por defecto, denegar acceso.
  return false;
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
