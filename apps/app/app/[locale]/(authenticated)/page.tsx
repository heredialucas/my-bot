import { redirect } from "next/navigation";

export default function AuthenticatedRootPage({
    params,
}: {
    params: { locale: string };
}) {
    redirect(`/${params.locale}/account`);
} 