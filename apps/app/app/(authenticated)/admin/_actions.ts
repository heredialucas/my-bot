'use server'

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@repo/auth/server";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  // Verificar que el usuario actual es admin
  if (!await checkRole('admin')) {
    console.error('No autorizado para asignar roles');
    return;
  }

  try {
    const client = await clerkClient();
    const userId = formData.get('id') as string;
    const roleValue = formData.get('role') as string;
    
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: roleValue },
    });
    
    console.log(`Rol asignado: ${roleValue} al usuario: ${userId}`);
    revalidatePath('/admin/users');
  } catch (err) {
    console.error("Error al asignar rol:", err);
  }
}

export async function removeRole(formData: FormData) {
  // Verificar que el usuario actual es admin
  if (!await checkRole('admin')) {
    console.error('No autorizado para eliminar roles');
    return;
  }

  try {
    const client = await clerkClient();
    const userId = formData.get('id') as string;
    
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    });
    
    console.log(`Rol eliminado del usuario: ${userId}`);
    revalidatePath('/admin/users');
  } catch (err) {
    console.error("Error al eliminar rol:", err);
  }
} 