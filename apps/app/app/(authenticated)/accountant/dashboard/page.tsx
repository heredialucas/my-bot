import { getAllData } from "@repo/data-services";

export default async function AccountantDashboard() {
    const data = await getAllData();
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>
            </div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
} 