import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import { NotificationsProvider } from '@repo/notifications/components/provider';
import { AuthProvider } from '@repo/auth/provider';
import { secure } from '@repo/security';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

// Este es un enfoque más simple: Crear layouts separados
const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    return redirectToSignIn();
  }

  // Como no podemos acceder fácilmente a la ruta actual en Server Components,
  // vamos a aplicar otra estrategia: Remover completamente la barra lateral
  // del layout principal y dejar que cada sección (admin, accountant, client)
  // implemente su propia barra lateral.

  return (
    <NotificationsProvider userId={user.id}>
      <AuthProvider>
        <SidebarProvider>
          {children}
          <PostHogIdentifier />
        </SidebarProvider>
      </AuthProvider>
    </NotificationsProvider>
  );
};

export default AppLayout;
