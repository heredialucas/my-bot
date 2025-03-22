import { Alert, AlertDescription, AlertTitle } from "@repo/design-system/components/ui/alert"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs"
import ServicesTab from "./ServicesTab"
import PlansTab from "./PlansTab"
import PromotionsTab from "./PromotionsTab"
import AddonsTab from "./AddonsTab"
import MediaTab from "./MediaTab"

export default async function DashboardContent() {
    return (
        <div className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Panel de Administración de Servicios</AlertTitle>
                <AlertDescription className="text-blue-700">
                    Gestiona servicios de internet, planes, promociones y complementos desde este panel centralizado.
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="services" className="w-full">
                <div className="overflow-x-auto pb-2">
                    <TabsList className="inline-flex w-auto min-w-full md:grid md:grid-cols-5 mb-4">
                        <TabsTrigger value="services">Servicios</TabsTrigger>
                        <TabsTrigger value="plans">Planes</TabsTrigger>
                        <TabsTrigger value="promotions">Promociones</TabsTrigger>
                        <TabsTrigger value="addons">Complementos</TabsTrigger>
                        <TabsTrigger value="media">Imágenes</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="services" className="space-y-4">
                    <ServicesTab />
                </TabsContent>

                <TabsContent value="plans" className="space-y-4">
                    <PlansTab />
                </TabsContent>

                <TabsContent value="promotions" className="space-y-4">
                    <PromotionsTab />
                </TabsContent>

                <TabsContent value="addons" className="space-y-4">
                    <AddonsTab />
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                    <MediaTab />
                </TabsContent>
            </Tabs>
        </div>
    )
} 