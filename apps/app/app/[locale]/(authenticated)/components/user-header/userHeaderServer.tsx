import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { UserHeaderClient } from "./userHeaderClient";
import Image from 'next/image';
import logo from '@/app/public/logo.png';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export async function UserHeaderServer() {
    const user = await getCurrentUser();
    return <UserHeaderClient user={user as User} logo={<Image src={logo} alt="Repartito" width={32} height={32} />} />;
}