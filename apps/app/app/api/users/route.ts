import { auth, clerkClient } from '@repo/auth/server';
import { NextRequest, NextResponse } from 'next/server';

// Definición de tipos para los session claims
type SessionMetadata = {
  role?: string;
  [key: string]: any;
};

export async function GET(request: NextRequest) {
  try {
    // Verificar autorización
    const { sessionClaims } = await auth();
    
    // Extraer el rol de la metadata con tipado correcto
    const metadata = sessionClaims?.metadata as SessionMetadata | undefined;
    const publicMetadata = sessionClaims?.publicMetadata as SessionMetadata | undefined;
    const userRole = metadata?.role || publicMetadata?.role;
    
    // Solo permitir a administradores acceder a esta API
    if (userRole !== 'admin' && userRole !== 'org:admin') {
      return NextResponse.json(
        { error: 'No autorizado para ver usuarios' }, 
        { status: 403 }
      );
    }
    
    // Obtener parámetro de búsqueda
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search') || '';
    
    // Obtener lista de usuarios
    const client = await clerkClient();
    
    const users = query 
      ? (await client.users.getUserList({ query, limit: 20 })).data 
      : (await client.users.getUserList({ limit: 20 })).data;
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' }, 
      { status: 500 }
    );
  }
} 