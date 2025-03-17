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

// Definir los patrones de rutas para cada rol
const isAdminRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin');
const isAccountantRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/accountant');
const isClientRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/client');

// Middleware para seguridad
const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

export default authMiddleware((req) => {
  // Volvemos a la configuración original pero dejamos comentada nuestra lógica RBAC para implementar
  // una solución basada en verificaciones a nivel de página o componente usando Clerk <Protect>
  
  // La protección por roles se implementará a nivel de páginas/componentes
  
  // Aplicar configuraciones de seguridad
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
