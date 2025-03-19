import { Suspense } from 'react'
import { Button } from "@repo/design-system/components/ui/button"
import { Plus } from "lucide-react"
import DashboardContent from './DashboardContent'
import Link from "next/link"

export default function DashboardWrapper() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        asChild
                    >
                        <Link href="/accountant/dashboard/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Cliente
                        </Link>
                    </Button>
                </div>
            </div>

            <Suspense fallback={<div>Cargando datos del panel...</div>}>
                <DashboardContent />
            </Suspense>

            {/* Additional client-side interactive components would go here */}
        </div>
    )
} 