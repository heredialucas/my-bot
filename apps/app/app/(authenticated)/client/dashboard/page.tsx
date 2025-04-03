import Dashboard from "./components/Dashboard";

export default async function ClientDashboard() {
    const data = {
        user: {
            name: "John Doe",
            email: "john.doe@example.com"
        }
    }

    return (
        <div>
            <h1>Client Dashboard</h1>
            <Dashboard data={data} />
        </div>
    )
} 