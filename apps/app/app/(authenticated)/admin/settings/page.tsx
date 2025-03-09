import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Settings, Database, Shield, Mail, Bell, Server, UserCog, Briefcase, Globe, Save } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@repo/design-system/components/ui/select";
import { Separator } from "@repo/design-system/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                </Button>
            </div>

            <Tabs defaultValue="general">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 space-y-6">
                        <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                            <TabsTrigger value="general" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Settings className="h-4 w-4 mr-2" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="company" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Briefcase className="h-4 w-4 mr-2" />
                                Información de Empresa
                            </TabsTrigger>
                            <TabsTrigger value="users" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <UserCog className="h-4 w-4 mr-2" />
                                Usuarios y Permisos
                            </TabsTrigger>
                            <TabsTrigger value="security" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Shield className="h-4 w-4 mr-2" />
                                Seguridad
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Bell className="h-4 w-4 mr-2" />
                                Notificaciones
                            </TabsTrigger>
                            <TabsTrigger value="database" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Database className="h-4 w-4 mr-2" />
                                Base de Datos
                            </TabsTrigger>
                            <TabsTrigger value="api" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Server className="h-4 w-4 mr-2" />
                                API y Servicios
                            </TabsTrigger>
                            <TabsTrigger value="localization" className="justify-start py-2 px-3 h-9 data-[state=active]:bg-muted">
                                <Globe className="h-4 w-4 mr-2" />
                                Localización
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1">
                        <TabsContent value="general" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración General</CardTitle>
                                    <CardDescription>
                                        Ajustes generales de la plataforma
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="site-name">Nombre del Sitio</Label>
                                            <Input id="site-name" defaultValue="SOPY - Sistema Operativo Profesional y Tributario" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="site-description">Descripción</Label>
                                            <Textarea
                                                id="site-description"
                                                defaultValue="Plataforma de gestión tributaria, contable y administrativa para empresas y contadores."
                                                rows={3}
                                            />
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="items-per-page">Elementos por Página</Label>
                                            <Select defaultValue="10">
                                                <SelectTrigger id="items-per-page">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="20">20</SelectItem>
                                                    <SelectItem value="50">50</SelectItem>
                                                    <SelectItem value="100">100</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="date-format">Formato de Fecha</Label>
                                            <Select defaultValue="dd/mm/yyyy">
                                                <SelectTrigger id="date-format">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                                                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                                                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="enable-dark-mode" defaultChecked />
                                            <Label htmlFor="enable-dark-mode">Habilitar Modo Oscuro por Defecto</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="maintenance-mode" />
                                            <Label htmlFor="maintenance-mode">Modo de Mantenimiento</Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="company" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información de Empresa</CardTitle>
                                    <CardDescription>
                                        Datos de la empresa para informes y documentos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company-name">Nombre de la Empresa</Label>
                                            <Input id="company-name" defaultValue="SOPY SpA" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company-rut">RUT</Label>
                                            <Input id="company-rut" defaultValue="76.123.456-7" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="company-email">Email</Label>
                                                <Input id="company-email" type="email" defaultValue="contacto@sopy.cl" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company-phone">Teléfono</Label>
                                                <Input id="company-phone" defaultValue="+56 2 2345 6789" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company-address">Dirección</Label>
                                            <Textarea id="company-address" defaultValue="Av. Providencia 1234, Providencia, Santiago" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="company-city">Ciudad</Label>
                                                <Input id="company-city" defaultValue="Santiago" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company-region">Región</Label>
                                                <Input id="company-region" defaultValue="Metropolitana" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company-postal">Código Postal</Label>
                                                <Input id="company-postal" defaultValue="7500000" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company-website">Sitio Web</Label>
                                            <Input id="company-website" defaultValue="https://www.sopy.cl" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="users" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Usuarios y Permisos</CardTitle>
                                    <CardDescription>
                                        Configuración de acceso y permisos para usuarios
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="enable-registration" defaultChecked />
                                            <Label htmlFor="enable-registration">Permitir Registro de Nuevos Usuarios</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="admin-approval" defaultChecked />
                                            <Label htmlFor="admin-approval">Requerir Aprobación de Administrador</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="auto-deactivate" />
                                            <Label htmlFor="auto-deactivate">Desactivar Usuarios Inactivos (90 días)</Label>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="default-role">Rol por Defecto para Nuevos Usuarios</Label>
                                            <Select defaultValue="client">
                                                <SelectTrigger id="default-role">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                    <SelectItem value="accountant">Contador</SelectItem>
                                                    <SelectItem value="client">Cliente</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                                            <Input id="session-timeout" type="number" defaultValue="60" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Seguridad</CardTitle>
                                    <CardDescription>
                                        Configuraciones de seguridad del sistema
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="enable-2fa" defaultChecked />
                                            <Label htmlFor="enable-2fa">Habilitar Autenticación de Dos Factores</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="require-2fa-admin" defaultChecked />
                                            <Label htmlFor="require-2fa-admin">Requerir 2FA para Administradores</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="password-complexity" defaultChecked />
                                            <Label htmlFor="password-complexity">Requerir Contraseñas Complejas</Label>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="password-expiration">Caducidad de Contraseñas (días)</Label>
                                            <Input id="password-expiration" type="number" defaultValue="90" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="max-login-attempts">Máximo de Intentos de Inicio de Sesión</Label>
                                            <Input id="max-login-attempts" type="number" defaultValue="5" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="lockout-duration">Duración del Bloqueo (minutos)</Label>
                                            <Input id="lockout-duration" type="number" defaultValue="30" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notificaciones</CardTitle>
                                    <CardDescription>
                                        Configuración de notificaciones y alertas del sistema
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email-from">Email Remitente</Label>
                                            <Input id="email-from" defaultValue="notificaciones@sopy.cl" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email-reply-to">Email de Respuesta</Label>
                                            <Input id="email-reply-to" defaultValue="soporte@sopy.cl" />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-new-user" defaultChecked />
                                            <Label htmlFor="notify-new-user">Notificar Nuevos Usuarios</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-tax-deadline" defaultChecked />
                                            <Label htmlFor="notify-tax-deadline">Notificar Vencimientos Tributarios</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-document-upload" defaultChecked />
                                            <Label htmlFor="notify-document-upload">Notificar Subida de Documentos</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="notify-security-events" defaultChecked />
                                            <Label htmlFor="notify-security-events">Notificar Eventos de Seguridad</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notification-advance-days">Días de Anticipación para Vencimientos</Label>
                                            <Input id="notification-advance-days" type="number" defaultValue="5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="database" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Base de Datos</CardTitle>
                                    <CardDescription>
                                        Configuración y mantenimiento de la base de datos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="auto-backup" defaultChecked />
                                            <Label htmlFor="auto-backup">Respaldo Automático</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="backup-frequency">Frecuencia de Respaldo</Label>
                                            <Select defaultValue="daily">
                                                <SelectTrigger id="backup-frequency">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hourly">Cada hora</SelectItem>
                                                    <SelectItem value="daily">Diario</SelectItem>
                                                    <SelectItem value="weekly">Semanal</SelectItem>
                                                    <SelectItem value="monthly">Mensual</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="backup-retention">Retención de Respaldos (días)</Label>
                                            <Input id="backup-retention" type="number" defaultValue="30" />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center space-x-2">
                                            <Switch id="auto-cleanup" defaultChecked />
                                            <Label htmlFor="auto-cleanup">Limpieza Automática de Registros Antiguos</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="cleanup-period">Periodo de Limpieza (meses)</Label>
                                            <Input id="cleanup-period" type="number" defaultValue="12" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button variant="outline">
                                            <Database className="h-4 w-4 mr-2" />
                                            Realizar Respaldo Ahora
                                        </Button>
                                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                            Optimizar Base de Datos
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="api" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>API y Servicios</CardTitle>
                                    <CardDescription>
                                        Configuración de la API y servicios externos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="enable-api" defaultChecked />
                                            <Label htmlFor="enable-api">Habilitar API</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="api-rate-limit">Límite de Peticiones (por minuto)</Label>
                                            <Input id="api-rate-limit" type="number" defaultValue="100" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="api-key-expiration">Caducidad de Claves API (días)</Label>
                                            <Input id="api-key-expiration" type="number" defaultValue="365" />
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="sii-integration">Integración SII</Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="enable-sii" defaultChecked />
                                                <Label htmlFor="enable-sii">Habilitar Integración con SII</Label>
                                            </div>
                                            <Input id="sii-api-key" placeholder="API Key SII" type="password" defaultValue="••••••••••••••••" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="banco-central-integration">Integración Banco Central</Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="enable-banco-central" defaultChecked />
                                                <Label htmlFor="enable-banco-central">Habilitar Actualización de Indicadores</Label>
                                            </div>
                                            <Input id="banco-central-api-key" placeholder="API Key Banco Central" type="password" defaultValue="••••••••••••••••" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="localization" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Localización</CardTitle>
                                    <CardDescription>
                                        Configuración de idioma, moneda y formato regional
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="default-language">Idioma por Defecto</Label>
                                            <Select defaultValue="es-CL">
                                                <SelectTrigger id="default-language">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="es-CL">Español (Chile)</SelectItem>
                                                    <SelectItem value="es-ES">Español (España)</SelectItem>
                                                    <SelectItem value="en-US">English (USA)</SelectItem>
                                                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="default-currency">Moneda por Defecto</Label>
                                            <Select defaultValue="CLP">
                                                <SelectTrigger id="default-currency">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CLP">Peso Chileno (CLP)</SelectItem>
                                                    <SelectItem value="USD">Dólar (USD)</SelectItem>
                                                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                                    <SelectItem value="UF">Unidad de Fomento (UF)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="timezone">Zona Horaria</Label>
                                            <Select defaultValue="America/Santiago">
                                                <SelectTrigger id="timezone">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="America/Santiago">América/Santiago</SelectItem>
                                                    <SelectItem value="America/Buenos_Aires">América/Buenos Aires</SelectItem>
                                                    <SelectItem value="America/Sao_Paulo">América/São Paulo</SelectItem>
                                                    <SelectItem value="America/Bogota">América/Bogotá</SelectItem>
                                                    <SelectItem value="America/Mexico_City">América/Ciudad de México</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="number-format">Formato de Números</Label>
                                            <Select defaultValue="dot">
                                                <SelectTrigger id="number-format">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="comma">1.000,00 (Coma)</SelectItem>
                                                    <SelectItem value="dot">1,000.00 (Punto)</SelectItem>
                                                    <SelectItem value="space">1 000,00 (Espacio)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch id="enable-multi-currency" defaultChecked />
                                            <Label htmlFor="enable-multi-currency">Habilitar Múltiples Monedas</Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
} 