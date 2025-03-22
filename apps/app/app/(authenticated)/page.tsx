import { auth, currentUser } from '@repo/auth/server';
import { CloudFog } from 'lucide-react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const title = 'NetFull';
const description = 'NetFull';

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

  const userRole = user.publicMetadata?.role as string;

  // Redirigir según el rol
  switch (userRole) {
    case 'admin':
      return redirect('/admin/dashboard');
    default:
      return redirect('/sign-in');
  }
}
