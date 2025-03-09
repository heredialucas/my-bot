import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";

export default function MyDataPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Mis Datos</h1>
                <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                    Guardar Cambios
                </Button>
            </div>

            <Tabs defaultValue="personal">
                <TabsList className="mb-4">
                    <TabsTrigger value="personal">Datos Personales</TabsTrigger>
                    <TabsTrigger value="company">Datos Empresa</TabsTrigger>
                    <TabsTrigger value="tax">Información Tributaria</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Información Personal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" placeholder="Nombre Completo" defaultValue="Lucas Heredia" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rut">RUT</Label>
                                    <Input id="rut" placeholder="12.345.678-9" defaultValue="17.238.453-6" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" placeholder="correo@ejemplo.com" defaultValue="lucas@appwise.cl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" placeholder="+56 9 1234 5678" defaultValue="+56 9 8765 4321" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Textarea id="address" placeholder="Dirección completa" defaultValue="Av. Las Condes 12345, Las Condes, Santiago" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="company">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Datos de la Empresa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Razón Social</Label>
                                    <Input id="company-name" placeholder="Razón Social" defaultValue="Appwise SpA" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-rut">RUT Empresa</Label>
                                    <Input id="company-rut" placeholder="12.345.678-9" defaultValue="76.543.210-K" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-type">Tipo de Empresa</Label>
                                    <Select defaultValue="spa">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione tipo de empresa" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="spa">Sociedad por Acciones (SpA)</SelectItem>
                                            <SelectItem value="ltda">Sociedad de Responsabilidad Limitada</SelectItem>
                                            <SelectItem value="sa">Sociedad Anónima (S.A.)</SelectItem>
                                            <SelectItem value="eirl">Empresa Individual de Responsabilidad Limitada</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="economic-activity">Actividad Económica</Label>
                                    <Input id="economic-activity" placeholder="Código actividad económica" defaultValue="620200" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company-address">Dirección Comercial</Label>
                                <Textarea id="company-address" placeholder="Dirección completa" defaultValue="Av. Las Condes 12345, Oficina 501, Las Condes, Santiago" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tax">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Información Tributaria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tax-regime">Régimen Tributario</Label>
                                    <Select defaultValue="semi">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione régimen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="semi">Régimen Semi Integrado</SelectItem>
                                            <SelectItem value="attr">Régimen Atribuido</SelectItem>
                                            <SelectItem value="pyme">Régimen Pro-Pyme</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="iva-status">Afecto a IVA</Label>
                                    <Select defaultValue="yes">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Sí</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="start-date">Fecha Inicio Actividades</Label>
                                    <Input id="start-date" type="date" defaultValue="2020-03-15" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ppm-rate">Tasa PPM</Label>
                                    <Input id="ppm-rate" placeholder="%" defaultValue="0.25" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="observations">Observaciones Tributarias</Label>
                                <Textarea id="observations" placeholder="Observaciones" defaultValue="Empresa con beneficio de postergación del IVA." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 