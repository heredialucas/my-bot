'use client';

import { Dictionary } from '@repo/internationalization';
import { FeatureData } from './types';
import { FiberFeatureCard } from './fiber-feature-card';
import bandwidthImage from '@/public/bandwidth.png';
import speedImage from '@/public/speed.png';
import signalImage from '@/public/signal.png';
import qualityImage from '@/public/quality.png';

type FiberOpticInfoProps = {
    dictionary: Dictionary;
};

export const FiberOpticInfo = ({ dictionary }: FiberOpticInfoProps) => {
    const features: FeatureData[] = [
        {
            id: 'bandwidth',
            title: 'Mayor ancho de banda',
            description: 'Gracias al mayor ancho de banda, tu red puede recibir un mayor tráfico de datos simultáneamente. Si el tráfico son películas, series y música podrás escuchar más canciones y ver más películas y series!',
            image: bandwidthImage,
        },
        {
            id: 'speed',
            title: 'Velocidades más altas',
            description: 'En la fibra óptica los datos se transmiten mediante pulsos de luz, esto hace que la velocidad del internet sea más rápida. ¡La información viaja a la velocidad de la luz!',
            image: speedImage,
        },
        {
            id: 'signal',
            title: 'Menor degradación de la señal',
            description: 'En la fibra óptica los datos se transmiten mediante pulsos de luz, esto hace que la velocidad del internet sea más rápida. ¡La información viaja a la velocidad de la luz!',
            image: signalImage,
        },
        {
            id: 'quality',
            title: 'Mejor calidad de reproducción',
            description: 'La fibra óptica permite conectar más dispositivos al mismo tiempo y realizar actividades que demandan mayor capacidad de navegación (vídeos, streaming, jugar en línea, etc.)',
            image: qualityImage,
        },
    ];

    return (
        <div className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold">
                        ¿Qué es la <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">fibra óptica</span>
                    </h2>
                    <h2 className="text-4xl font-bold">y cómo funciona?</h2>
                </div>

                <div className="text-center mx-auto max-w-4xl mb-12">
                    <p className="text-base text-gray-700">
                        La fibra óptica es la tecnología que brindamos con el servicio de acceso a internet,
                        permitiendo navegar de manera estable, con mayor velocidad y en múltiples dispositivos al
                        mismo tiempo.
                    </p>
                </div>

                <div className="flex gap-6">
                    <div className="w-full">
                        <FiberFeatureCard feature={features[0]} />
                    </div>
                    <div className="w-full">
                        <FiberFeatureCard feature={features[1]} />
                    </div>
                    <div className="w-full">
                        <FiberFeatureCard feature={features[2]} />
                    </div>
                    <div className="w-full">
                        <FiberFeatureCard feature={features[3]} />
                    </div>
                </div>
            </div>
        </div>
    );
}; 