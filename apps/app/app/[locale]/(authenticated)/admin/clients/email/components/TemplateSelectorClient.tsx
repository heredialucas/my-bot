'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { Label } from '@repo/design-system/components/ui/label';
import { EmailTemplateData } from '@repo/data-services';
import { useInitStore } from '@/store/initStore';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/design-system/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { Save, Trash2 } from 'lucide-react';

interface TemplateSelectorClientProps {
    templates: EmailTemplateData[];
    onTemplateSelect: (template: {
        subject: string;
        content: string;
    }) => void;
    selectedTemplate?: {
        subject: string;
        content: string;
    } | null;
    onCreateTemplate: (name: string, subject: string, content: string, description?: string) => Promise<{ success: boolean; error?: string }>;
    onDeleteTemplate: (templateId: string) => Promise<{ success: boolean; error?: string }>;
    onTemplateCreated?: () => void;
}

export function TemplateSelectorClient({
    templates,
    onTemplateSelect,
    selectedTemplate,
    onCreateTemplate,
    onDeleteTemplate,
    onTemplateCreated
}: TemplateSelectorClientProps) {
    const { emailTemplates, setEmailTemplates, setEmailTemplateSelection } = useInitStore();

    // Estados para el modal de guardar template
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [templateDescription, setTemplateDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Estados para eliminar template
    const [isDeleting, setIsDeleting] = useState(false);

    // Inicializar templates en el store si no están cargados
    if (emailTemplates.templates.length === 0 && templates.length > 0) {
        setEmailTemplates(templates);
    }

    const handleTemplateChange = (templateId: string) => {
        setEmailTemplateSelection(templateId);

        if (templateId === 'custom') {
            onTemplateSelect({
                subject: emailTemplates.customSubject,
                content: emailTemplates.customContent
            });
            return;
        }

        const template = emailTemplates.templates.find(t => t.id === templateId);
        if (template) {
            onTemplateSelect({
                subject: template.subject,
                content: template.content
            });
        }
    };

    const handleSubjectChange = (value: string) => {
        onTemplateSelect({
            subject: value,
            content: emailTemplates.customContent
        });
    };

    const handleContentChange = (value: string) => {
        onTemplateSelect({
            subject: emailTemplates.customSubject,
            content: value
        });
    };

    const handleSaveTemplate = async () => {
        if (!templateName.trim() || !emailTemplates.customSubject.trim() || !emailTemplates.customContent.trim()) {
            alert('Completa todos los campos requeridos');
            return;
        }

        setIsSaving(true);
        try {
            const result = await onCreateTemplate(
                templateName.trim(),
                emailTemplates.customSubject.trim(),
                emailTemplates.customContent.trim(),
                templateDescription.trim() || undefined
            );

            if (result.success) {
                alert('Template guardado exitosamente');
                setShowSaveDialog(false);
                setTemplateName('');
                setTemplateDescription('');
                onTemplateCreated?.();
            } else {
                alert(`Error al guardar el template: ${result.error}`);
            }
        } catch (error) {
            console.error('Error saving template:', error);
            alert(`Error al guardar el template: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTemplate = async (templateId: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este template?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await onDeleteTemplate(templateId);

            if (result.success) {
                alert('Template eliminado exitosamente');
                // Actualizar el store removiendo el template eliminado
                const updatedTemplates = emailTemplates.templates.filter(t => t.id !== templateId);
                setEmailTemplates(updatedTemplates);

                // Si estaba seleccionado, resetear la selección
                if (emailTemplates.selectedTemplateId === templateId) {
                    setEmailTemplateSelection('custom');
                }

                onTemplateCreated?.();
            } else {
                alert(`Error al eliminar el template: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting template:', error);
            alert(`Error al eliminar el template: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const canSaveAsTemplate = emailTemplates.customSubject.trim() && emailTemplates.customContent.trim() &&
        (emailTemplates.selectedTemplateId === 'custom' || emailTemplates.selectedTemplateId === '');

    return (
        <Card>
            <CardHeader>
                <CardTitle>📧 Seleccionar Template de Email</CardTitle>
                <CardDescription>
                    Elige un template predefinido o crea un mensaje personalizado
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="template-select">Template</Label>
                    <Select value={emailTemplates.selectedTemplateId} onValueChange={handleTemplateChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un template..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="custom">✍️ Mensaje personalizado</SelectItem>
                            {emailTemplates.templates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                    {template.isDefault ? '⭐ ' : ''}{template.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="subject">Asunto del Email</Label>
                    <Input
                        id="subject"
                        value={emailTemplates.customSubject}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        placeholder="Escribe el asunto del email..."
                    />
                </div>

                <div>
                    <Label htmlFor="content">Contenido del Email</Label>
                    <Textarea
                        id="content"
                        value={emailTemplates.customContent}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="Escribe el contenido del email..."
                        rows={8}
                    />
                </div>

                {emailTemplates.selectedTemplateId && emailTemplates.selectedTemplateId !== 'custom' && (
                    <div className="text-sm text-muted-foreground">
                        💡 Puedes editar el contenido arriba para personalizar este template
                    </div>
                )}

                {/* Template seleccionado - mostrar info y botón eliminar */}
                {emailTemplates.selectedTemplateId && emailTemplates.selectedTemplateId !== 'custom' && (
                    (() => {
                        const selectedTemplate = emailTemplates.templates.find(t => t.id === emailTemplates.selectedTemplateId);
                        if (!selectedTemplate) return null;

                        return (
                            <div className="p-3 border rounded-lg bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium flex items-center gap-2">
                                            {selectedTemplate.isDefault ? '⭐' : '📝'} {selectedTemplate.name}
                                        </h4>
                                        {selectedTemplate.description && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {selectedTemplate.description}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteTemplate(selectedTemplate.id)}
                                        disabled={isDeleting}
                                        className="text-destructive border-destructive/20 hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                    </Button>
                                </div>
                            </div>
                        );
                    })()
                )}

                {canSaveAsTemplate && (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                            ¿Te gusta este contenido? Guárdalo como template para reutilizarlo
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSaveDialog(true)}
                            className="flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Guardar Template
                        </Button>
                    </div>
                )}
            </CardContent>

            {/* Modal para guardar template */}
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Guardar como Template</DialogTitle>
                        <DialogDescription>
                            Guarda este contenido como un template reutilizable para futuros envíos
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="template-name">Nombre del Template *</Label>
                            <Input
                                id="template-name"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Ej: Promoción Black Friday"
                            />
                        </div>

                        <div>
                            <Label htmlFor="template-description">Descripción (opcional)</Label>
                            <Textarea
                                id="template-description"
                                value={templateDescription}
                                onChange={(e) => setTemplateDescription(e.target.value)}
                                placeholder="Describe cuándo usar este template..."
                                rows={2}
                            />
                        </div>

                        <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                            <strong>Vista previa:</strong>
                            <div className="mt-2">
                                <div><strong>Asunto:</strong> {emailTemplates.customSubject}</div>
                                <div className="mt-1"><strong>Contenido:</strong> {emailTemplates.customContent.substring(0, 100)}...</div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowSaveDialog(false)}
                            disabled={isSaving}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSaveTemplate}
                            disabled={isSaving || !templateName.trim()}
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Template'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
} 