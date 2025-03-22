import { Button } from "@repo/design-system/components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { getAllPlans, deletePlan } from "../../server/planActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default async function PlansTab() {
    // Obtener todos los planes
    const plans = await getAllPlans();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Planes</h2>
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
                        <Card key={plan.id}>
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
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex flex-col">
                                    <div className="text-sm text-muted-foreground">
                                        Precio: ${plan.price}
                                    </div>
                                    {plan.speed && (
                                        <div className="text-sm text-muted-foreground">
                                            Velocidad: {plan.speed} Mbps
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 