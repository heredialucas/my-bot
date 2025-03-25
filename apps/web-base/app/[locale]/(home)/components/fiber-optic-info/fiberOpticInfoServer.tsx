import { getAllImages } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';
import { FiberOpticInfoClient } from './fiberOpticInfoClient';
type FiberOpticInfoServerProps = {
    dictionary: Dictionary;
};

export async function FiberOpticInfoServer({ dictionary }: FiberOpticInfoServerProps) {
    // Podríamos obtener imágenes dinámicas para las características de fibra óptica
    const allImages = await getAllImages();

    // Filtrar las imágenes relacionadas con fibra óptica si es necesario
    const fiberOpticImages = allImages.filter(image =>
        image.name.toLowerCase().includes('fiber') ||
        image.description?.toLowerCase().includes('fibra')
    );

    return <FiberOpticInfoClient
        dictionary={dictionary}
        fiberOpticImages={fiberOpticImages}
    />;
} 