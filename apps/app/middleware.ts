import { authMiddleware } from '@repo/auth/middleware';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import type { NextMiddleware } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from './env';

// Dynamic role system - easily extendable
const ROLES = {
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
  USER: 'user',
  // Add more roles as needed
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

// Role configuration with route permissions
interface RoleConfig {
  defaultRedirect: string;
  allowedRoutes: string[];
}

// Map roles to their configurations
// To add a new role, simply add a new entry here
const ROLE_CONFIGURATION: Record<Role, RoleConfig> = {
  [ROLES.ADMIN]: {
    defaultRedirect: '/admin/dashboard',
    allowedRoutes: ['/admin']
  },
  [ROLES.ACCOUNTANT]: {
    defaultRedirect: '/accountant/dashboard',
    allowedRoutes: ['/accountant']
  },
  [ROLES.USER]: {
    defaultRedirect: '/access-denied',
    allowedRoutes: []
  }
  // Example for adding a new role:
  // [ROLES.PROFESSIONAL]: {
  //   defaultRedirect: '/professional/dashboard',
  //   allowedRoutes: ['/professional']
  // }
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/api/webhooks',
  '/access-denied',
];

// Security middleware
const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

// Check if a route is a public route
const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
};

// Check if the URL path is within the authenticated route group
const isAuthenticatedRoute = (pathname: string): boolean => {
  // All routes except those in PUBLIC_ROUTES are considered authenticated
  return !isPublicRoute(pathname);
};

// Check if user has access to the current route based on their role
const hasAccessToRoute = (pathname: string, userRole: Role): boolean => {
  // If user doesn't have a configured role, they don't have access
  if (!ROLE_CONFIGURATION[userRole]) return false;

  // Check if current route is allowed for user's role
  return ROLE_CONFIGURATION[userRole].allowedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
};

// Determine user role from session claims
const getUserRole = (claims: any): Role => {
  if (!claims) return ROLES.USER;

  // Extract org_role from claims
  const orgRole = claims?.org_role;

  // Check for admin role in various formats
  if (
    orgRole === ROLES.ADMIN ||
    orgRole === `org:${ROLES.ADMIN}`
  ) {
    return ROLES.ADMIN;
  }
  if (
    orgRole === ROLES.ACCOUNTANT ||
    orgRole === `org:${ROLES.ACCOUNTANT}`
  ) {
    return ROLES.ACCOUNTANT;
  }

  // Add more role checks as needed
  // if (orgRole === ROLES.PROFESSIONAL || orgRole === `org:${ROLES.PROFESSIONAL}`) {
  //   return ROLES.PROFESSIONAL;
  // }

  // Default to USER role
  return ROLES.USER;
};

export default authMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // If no request, just apply security
  if (!req) return securityHeaders();

  const { pathname } = req.nextUrl;

  // Always allow public routes
  if (isPublicRoute(pathname)) {
    return securityHeaders();
  }

  // User is not authenticated but trying to access an authenticated route
  if (!userId && isAuthenticatedRoute(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // User is authenticated
  if (userId) {
    // Determine user role
    const userRole = getUserRole(sessionClaims);

    // Root path redirect to role-specific dashboard
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL(
        ROLE_CONFIGURATION[userRole]?.defaultRedirect || ROLE_CONFIGURATION[ROLES.USER].defaultRedirect,
        req.url
      ));
    }

    // Check if user has access to the requested route
    if (!hasAccessToRoute(pathname, userRole)) {

      // Admin can access any route
      if (userRole === ROLES.ADMIN) {
        return securityHeaders();
      }

      // Handle specific route access permissions
      if (pathname.startsWith('/accountant') && userRole !== ROLES.ACCOUNTANT) {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }

      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }

      // Otherwise redirect to their default route
      return NextResponse.redirect(new URL(
        ROLE_CONFIGURATION[userRole]?.defaultRedirect || ROLE_CONFIGURATION[ROLES.USER].defaultRedirect,
        req.url
      ));
    }
  }

  // Apply security headers
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
