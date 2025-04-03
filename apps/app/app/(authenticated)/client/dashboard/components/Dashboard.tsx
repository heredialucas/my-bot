import { DashboardProps } from "../types";

export default function Dashboard(props: DashboardProps) {
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    )
}