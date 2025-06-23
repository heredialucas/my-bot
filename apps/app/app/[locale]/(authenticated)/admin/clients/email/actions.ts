'use server';

import { getCurrentUser } from '@repo/auth/server';
import resend from '@repo/email';
import { keys } from '@repo/email/keys';
import { getClientsByCategory } from '@repo/data-services';

export async function sendBulkEmailAction(
    subject: string,
    content: string,
    selectedClients: string[]
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return { success: false, error: 'Usuario no autenticado' };
        }

        if (!resend) {
            return {
                success: false,
                error: 'Servicio de email no configurado. Configura RESEND_TOKEN en las variables de entorno.'
            };
        }

        const emailKeys = keys();
        const fromEmail = emailKeys.RESEND_FROM || 'noreply@gangamenu.com';

        // Obtener datos de clientes (reales o testing)
        let clientsData;

        if (selectedClients.includes('test-email-1') || selectedClients.includes('test-email-2')) {
            // Modo testing - usar emails específicos
            const testClients = [
                { id: 'test-email-1', name: 'Lucas', email: 'heredialucasfac22@gmail.com' },
                { id: 'test-email-2', name: 'Nicolás', email: 'nicolascaliari28@gmail.com' }
            ];
            clientsData = testClients.filter(client => selectedClients.includes(client.id));
        } else {
            // Modo normal - obtener clientes reales
            const allClients = await getClientsByCategory();
            clientsData = allClients.filter(client => selectedClients.includes(client.id));
        }

        if (clientsData.length === 0) {
            return {
                success: false,
                error: 'No se encontraron clientes válidos'
            };
        }

        let successCount = 0;
        let errorCount = 0;

        // Enviar emails usando Resend
        for (const client of clientsData) {
            try {
                const personalizedContent = content.replace(/\{nombre\}/g, client.name);

                await resend.emails.send({
                    from: fromEmail,
                    to: [client.email],
                    subject: subject,
                    html: personalizedContent,
                });

                successCount++;
                console.log(`✅ Email enviado a ${client.name} (${client.email})`);
            } catch (emailError) {
                errorCount++;
                console.error(`❌ Error enviando a ${client.name}:`, emailError);
            }
        }

        return {
            success: successCount > 0,
            message: errorCount > 0
                ? `${successCount} emails enviados, ${errorCount} fallaron`
                : `${successCount} emails enviados exitosamente`
        };

    } catch (error) {
        console.error('Error al enviar emails:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        };
    }
} 