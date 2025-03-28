import { Alert, AlertDescription, AlertTitle } from "@repo/design-system/components/ui/alert"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs"
import ServicesTab from "./ServicesTab"
import PlansTab from "./PlansTab"
import PromotionsTab from "./PromotionsTab"
import AddonsTab from "./AddonsTab"
import ImageTab from "./ImageTab"
import {
    getAllServices,
    deleteService,
    getAllPlans,
    deletePlan,
    getAllAddons,
    deleteAddon,
    getAllPromotionsWithDetails,
    deletePromotion
} from "@repo/data-services"
import { revalidatePath } from "next/cache"
import { Suspense } from "react"

// Define modified interfaces to handle null values from the database
interface ServiceForPromotion {
    id: string;
    name: string;
    speed?: number | null;
    price?: number | null;
    description?: string | null;
    serviceItems?: any[];
}

export default async function DashboardContent() {
    // Obtener todos los servicios para ServicesTab
    const services = await getAllServices();

    // Obtener todos los planes para PlansTab
    const plans = await getAllPlans();

    // Obtener todos los addons para AddonsTab
    const addons = await getAllAddons();

    // Obtener todas las promociones para PromotionsTab con todos los detalles
    const promotions = await getAllPromotionsWithDetails();

    // Server action para eliminar un servicio
    async function handleDeleteService(id: string) {
        "use server";
        await deleteService(id);
        revalidatePath('/admin/dashboard');
    }

    // Server action para eliminar un plan
    async function handleDeletePlan(id: string) {
        "use server";
        await deletePlan(id);
        revalidatePath('/admin/dashboard');
    }

    // Server action para eliminar un complemento
    async function handleDeleteAddon(id: string) {
        "use server";
        await deleteAddon(id);
        revalidatePath('/admin/dashboard');
    }

    // Server action para eliminar una promoción
    async function handleDeletePromotion(id: string) {
        "use server";
        await deletePromotion(id);
        revalidatePath('/admin/dashboard');
    }

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
                        <TabsTrigger value="addons">Complementos</TabsTrigger>
                        <TabsTrigger value="promotions">Promociones</TabsTrigger>
                        <TabsTrigger value="images">Imágenes</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="services" className="space-y-4">
                    <ServicesTab services={services} onDeleteService={handleDeleteService} />
                </TabsContent>

                <TabsContent value="plans" className="space-y-4">
                    <PlansTab plans={plans} onDeletePlan={handleDeletePlan} />
                </TabsContent>

                <TabsContent value="addons" className="space-y-4">
                    <AddonsTab addons={addons} onDeleteAddon={handleDeleteAddon} />
                </TabsContent>

                <TabsContent value="promotions" className="space-y-4">
                    <Suspense fallback={<div>Cargando promociones...</div>}>
                        <PromotionsTab
                            promotions={promotions}
                            services={services as any[]}
                            plans={plans}
                            addons={addons}
                            onDeletePromotion={handleDeletePromotion}
                        />
                    </Suspense>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                    <ImageTab />
                </TabsContent>
            </Tabs>
        </div>
    )
} 