import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { getUserById } from '@repo/data-services';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import { NotificationsProvider } from '@repo/notifications/components/provider';
import { AuthProvider } from '@repo/auth/provider';
import { secure } from '@repo/security';
import type { ReactNode } from 'react';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const betaFeature = await showBetaFeature();


  return (
    // <NotificationsProvider userId={user.id}>
    //   <AuthProvider>
    <SidebarProvider>
      {children}
    </SidebarProvider>
    //   </AuthProvider>
    // </NotificationsProvider>
  );
};

export default AppLayout;
