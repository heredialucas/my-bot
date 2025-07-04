import { redirect } from "next/navigation";

export default async function AuthenticatedRootPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    redirect(`/${locale}/account`);
} 