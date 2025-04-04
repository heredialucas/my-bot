export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Medical Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium mb-2">Doctors</h2>
                    <p className="text-gray-500 dark:text-gray-400">Doctor management will be implemented in future versions.</p>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium mb-2">Patients</h2>
                    <p className="text-gray-500 dark:text-gray-400">Patient management will be implemented in future versions.</p>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium mb-2">Prescriptions</h2>
                    <p className="text-gray-500 dark:text-gray-400">Prescription management will be implemented in future versions.</p>
                </div>
            </div>
        </div>
    );
}