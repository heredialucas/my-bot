import { authMiddleware } from '@repo/auth/middleware';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import type { NextMiddleware } from 'next/server';
import { env } from './env';

// Middleware para seguridad
const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

// Volvemos a la configuración original pero dejamos comentada nuestra lógica para referencia
// En lugar de modificar el middleware, confiamos en la redirección que implementamos en
// el archivo (authenticated)/page.tsx

export default authMiddleware(() => {
  // La redirección según roles se maneja en (authenticated)/page.tsx
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
