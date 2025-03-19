import { Suspense } from 'react'
import { Button } from "@repo/design-system/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import DashboardContent from './DashboardContent'

export default function DashboardWrapper() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        asChild
                    >
                        <Link href="/admin/dashboard/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Administrador
                        </Link>
                    </Button>
                </div>
            </div>

            <Suspense fallback={<div>Cargando datos del panel...</div>}>
                <DashboardContent />
            </Suspense>
        </div>
    )
} 