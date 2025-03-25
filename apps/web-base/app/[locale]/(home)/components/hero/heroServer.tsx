import { getAllImages } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';
import { HeroClient } from './heroClient';

type HeroServerProps = {
    dictionary: Dictionary;
};

export async function HeroServer({ dictionary }: HeroServerProps) {
    // Fetch hero slider images from the server
    const images = await getAllImages();

    return <HeroClient dictionary={dictionary} sliderImages={images} />;
} 