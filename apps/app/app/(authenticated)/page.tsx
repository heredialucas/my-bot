import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { database } from '@repo/database';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { AvatarStack } from './components/avatar-stack';
import { Cursors } from './components/cursors';
import { Header } from './components/header';
import RoleSelector from './role-selector';

const title = 'Acme Inc';
const description = 'My application.';

const CollaborationProvider = dynamic(() =>
  import('./components/collaboration-provider').then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

export default async function AuthenticatedHome() {
  // Obtenemos el usuario actual
  const user = await currentUser();
  const { userId } = await auth();

  if (!user || !userId) {
    // Si no hay usuario, redirigimos a inicio de sesión (manejado por Clerk)
    return redirect('/sign-in');
  }

  // Para facilitar las pruebas, mostramos un selector de roles
  // En producción, esto debería basarse en metadata o roles de usuarios
  return <RoleSelector />;

  /* 
  // Este código sería para una implementación completa de roles
  // Determinar el rol del usuario - leer de metadata
  const userRole = user.publicMetadata?.role as string || 'client';

  // Redirigir según el rol
  switch (userRole) {
    case 'admin':
      return redirect('/admin/dashboard');
    case 'accountant':
      return redirect('/accountant/dashboard');
    case 'client':
    default:
      return redirect('/client/dashboard');
  }
  */
}
