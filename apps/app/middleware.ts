import { authMiddleware } from '@repo/auth/middleware';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import type { NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from './env';

// Definición de tipos para los session claims
type SessionMetadata = {
  role?: string;
  [key: string]: any;
};

// Sistema de roles dinámico - fácilmente extensible
const ROLES = {
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
  CLIENT: 'client',
  // Aquí se pueden añadir más roles según sea necesario
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

// Configuración dinámica de rutas por rol
interface RoleConfig {
  defaultRedirect: string;
  allowedRoutes: string[];
}

// Mapeo de roles a sus configuraciones
// Para añadir un nuevo rol, simplemente agregar una nueva entrada aquí
const ROLE_CONFIGURATION: Record<Role, RoleConfig> = {
  [ROLES.ADMIN]: {
    defaultRedirect: '/admin/dashboard',
    allowedRoutes: ['/admin']
  },
  [ROLES.ACCOUNTANT]: {
    defaultRedirect: '/accountant/dashboard',
    allowedRoutes: ['/accountant']
  },
  [ROLES.CLIENT]: {
    defaultRedirect: '/client/dashboard',
    allowedRoutes: ['/client']
  }
  // Ejemplo para añadir un nuevo rol:
  // NUEVO_ROL: {
  //   defaultRedirect: '/nuevo-rol/dashboard',
  //   allowedRoutes: ['/nuevo-rol']
  // }
};

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/api/webhooks'];

// Middleware para seguridad
const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

// Función para verificar si el usuario tiene acceso a la ruta actual
const hasAccessToRoute = (pathname: string, userRole: Role): boolean => {
  // Si el usuario no tiene un rol configurado, no tiene acceso
  if (!ROLE_CONFIGURATION[userRole]) return false;

  // Verificamos si la ruta actual está permitida para el rol del usuario
  return ROLE_CONFIGURATION[userRole].allowedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
};

// Verificar si una ruta es parte de las rutas públicas
const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
};

// Función para determinar el rol del usuario basado en sus claims
const getUserRole = (claims: any): Role => {
  if (!claims) return ROLES.CLIENT;

  const metadata = claims.metadata as SessionMetadata | undefined;
  const publicMeta = claims.publicMetadata as SessionMetadata | undefined;

  // Verificamos en varias ubicaciones posibles donde podría estar el rol
  // Primero verificamos ADMIN
  if (
    metadata?.role === ROLES.ADMIN ||
    metadata?.role === `org:${ROLES.ADMIN}` ||
    claims?.["org_role"] === ROLES.ADMIN ||
    publicMeta?.role === ROLES.ADMIN
  ) {
    return ROLES.ADMIN;
  }

  // Luego verificamos ACCOUNTANT
  if (
    metadata?.role === ROLES.ACCOUNTANT ||
    metadata?.role === `org:${ROLES.ACCOUNTANT}` ||
    claims?.["org_role"] === ROLES.ACCOUNTANT ||
    publicMeta?.role === ROLES.ACCOUNTANT
  ) {
    return ROLES.ACCOUNTANT;
  }

  // Si no es ninguno de los anteriores, asumimos CLIENT como predeterminado
  return ROLES.CLIENT;
};

// Middleware de autenticación con soporte para roles
export default authMiddleware((auth, req) => {
  // Si no tenemos la solicitud, simplemente aplicamos la seguridad
  if (!req) return securityHeaders();

  // Extraemos el pathname de la URL
  const { pathname } = req.nextUrl;

  // Si la ruta es pública, permitimos el acceso
  if (isPublicRoute(pathname)) {
    return securityHeaders();
  }

  // Si el usuario está autenticado, verificamos los permisos según el rol
  // Usamos type assertion para tratar el objeto auth correctamente
  const userId = (auth as any).userId;
  if (userId) {
    try {
      // Obtenemos los claims del usuario
      const claims = (auth as any).sessionClaims || {};

      // Determinamos el rol del usuario usando nuestra función centralizada
      const userRole = getUserRole(claims);

      // Si estamos en la ruta principal, redirigimos al dashboard según el rol
      if (pathname === '/' || pathname === '') {
        return NextResponse.redirect(new URL(
          ROLE_CONFIGURATION[userRole]?.defaultRedirect || ROLE_CONFIGURATION[ROLES.CLIENT].defaultRedirect,
          req.url
        ));
      }

      // Verificamos si el usuario tiene acceso a la ruta actual
      if (!hasAccessToRoute(pathname, userRole)) {
        // Si no tiene acceso, redirigimos a su dashboard predeterminado
        return NextResponse.redirect(new URL(
          ROLE_CONFIGURATION[userRole]?.defaultRedirect || ROLE_CONFIGURATION[ROLES.CLIENT].defaultRedirect,
          req.url
        ));
      }
    } catch (error) {
      console.error('Error verificando permisos de rol:', error);
      // En caso de error, redirigimos al usuario a la ruta de cliente por defecto
      return NextResponse.redirect(new URL(ROLE_CONFIGURATION[ROLES.CLIENT].defaultRedirect, req.url));
    }
  }

  // Aplicamos las configuraciones de seguridad
  return securityHeaders();
}) as unknown as NextMiddleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
