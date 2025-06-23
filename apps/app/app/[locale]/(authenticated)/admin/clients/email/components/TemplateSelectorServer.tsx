'use server';

import { TemplateSelectorClient } from './TemplateSelectorClient';
import { createEmailTemplate, deleteEmailTemplate } from '@repo/data-services';
import { getCurrentUser } from '@repo/auth/server';
import { revalidatePath } from 'next/cache';
import type { EmailTemplateData } from '@repo/data-services';

interface TemplateSelectorServerProps {
    templates: EmailTemplateData[];
    onTemplateSelect: (template: {
        subject: string;
        content: string;
    }) => void;
    selectedTemplate?: {
        subject: string;
        content: string;
    } | null;
    onTemplateCreated?: () => void;
}

export async function TemplateSelectorServer(props: TemplateSelectorServerProps) {
    const handleCreateTemplate = async (name: string, subject: string, content: string, description?: string) => {

        try {
            const user = await getCurrentUser();
            if (!user) {
                return { success: false, error: 'Usuario no autenticado' };
            }

            await createEmailTemplate(user.id, {
                name,
                subject,
                content,
                description,
                isDefault: false
            });

            revalidatePath('/admin/clients/email');
            return { success: true };
        } catch (error) {
            console.error('Error al crear template de email:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    };

    const handleDeleteTemplate = async (templateId: string) => {

        try {
            const user = await getCurrentUser();
            if (!user) {
                return { success: false, error: 'Usuario no autenticado' };
            }

            await deleteEmailTemplate(templateId, user.id);

            revalidatePath('/admin/clients/email');
            return { success: true };
        } catch (error) {
            console.error('Error al eliminar template de email:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    };

    return (
        <TemplateSelectorClient
            {...props}
            onCreateTemplate={handleCreateTemplate}
            onDeleteTemplate={handleDeleteTemplate}
        />
    );
} 