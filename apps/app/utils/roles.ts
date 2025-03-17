'use server'

import { auth } from '@repo/auth/server'

// Definición de tipos para los session claims
type SessionMetadata = {
  role?: string;
  [key: string]: any;
};

export const checkRole = async (role: 'admin' | 'moderator' | 'user' | 'accountant') => {
  const { sessionClaims } = await auth()
  
  // Mostrar toda la información de session claims para depuración
  console.log("🔍 SESSION CLAIMS COMPLETO:", JSON.stringify(sessionClaims, null, 2))
  
  // Obtener metadata con tipado adecuado
  const metadata = sessionClaims?.metadata as SessionMetadata | undefined
  const publicMeta = sessionClaims?.publicMetadata as SessionMetadata | undefined
  
  // Verificar de múltiples formas para compatibilidad con diferentes configuraciones
  const hasRole = 
    // Verificar directamente como lo recomienda la documentación
    metadata?.role === role ||
    // Verificar con formato org:role como se usa en organizaciones
    metadata?.role === `org:${role}` ||
    // Verificar si está en org_role (si existe esta propiedad)
    sessionClaims?.["org_role"] === role ||
    // Verificar si el rol está en publicMetadata
    publicMeta?.role === role;
  
  console.log(`✅ Verificación de rol '${role}':`, hasRole)
  
  return hasRole
} 