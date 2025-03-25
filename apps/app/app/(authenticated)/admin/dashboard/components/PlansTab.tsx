import { Button } from "@repo/design-system/components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { getAllPlans, deletePlan } from "@repo/data-services";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

// Definir el tipo Plan con características dinámicas
type Plan = {
    id: string;
    name: string;
    price: number;
    regularPrice: number | null;
    promoMonths: number | null;
    createdAt: Date;
    updatedAt: Date;
    channelCount: number | null;
    planType: string;
    characteristics: {
        id: string;
        key: string;
        value: boolean;
        planId: string;
    }[];
};

export default async function PlansTab() {
    // Obtener todos los planes
    const plans = await getAllPlans() as Plan[];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Planes de Zapping</h2>
                <Link href="/admin/dashboard/new-plan">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nuevo Plan
                    </Button>
                </Link>
            </div>

            {plans.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay planes registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="relative">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">
                                        {plan.name}
                                    </CardTitle>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/dashboard/edit-plan/${plan.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server";
                                            await deletePlan(plan.id);
                                            revalidatePath('/admin/dashboard');
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="font-medium">Precio:</span> ${plan.price}
                                    </div>
                                    {plan.regularPrice && (
                                        <div>
                                            <span className="font-medium">Precio regular:</span> ${plan.regularPrice}
                                        </div>
                                    )}
                                    {plan.channelCount && (
                                        <div>
                                            <span className="font-medium">Canales:</span> {plan.channelCount}
                                        </div>
                                    )}
                                    {plan.promoMonths && (
                                        <div>
                                            <span className="font-medium">Meses promo:</span> {plan.promoMonths}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {/* Mostrar características dinámicas */}
                                    {plan.characteristics && plan.characteristics
                                        .filter(char => char.value)
                                        .map((char, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                            >
                                                {char.key}
                                            </span>
                                        ))
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 