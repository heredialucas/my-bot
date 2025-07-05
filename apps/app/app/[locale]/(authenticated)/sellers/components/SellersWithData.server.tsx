import { getAllSellers } from '@repo/data-services/src/services/userService';
import { getAllProducts } from '@repo/data-services/src/services/productService';
import { SellersClient } from './SellersClient.client';

export default async function SellersWithData() {
    const [sellers, products] = await Promise.all([
        getAllSellers(),
        getAllProducts(),
    ]);

    return <SellersClient data={sellers} products={products} />;
} 