'use client';

import { useEffect, useState } from 'react';

type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleDirection: boolean;
};

type SnowParticlesProps = {
    count?: number;
    themeColors: {
        decorative: {
            primary: string;
            secondary: string;
            tertiary: string;
            accent: string;
        };
    };
};

export const SnowParticles = ({ count = 70, themeColors }: SnowParticlesProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Generate initial particles
    useEffect(() => {
        if (typeof window === 'undefined') return;

        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const initialParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            initialParticles.push(createParticle(i));
        }
        setParticles(initialParticles);

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [count]);

    // Update particles position and twinkle effect
    useEffect(() => {
        if (particles.length === 0 || dimensions.width === 0) return;

        const interval = setInterval(() => {
            setParticles(prevParticles =>
                prevParticles.map(particle => {
                    // Update position
                    let y = particle.y + particle.speed;
                    let x = particle.x + Math.sin(y * 0.01) * 0.5; // Slight horizontal drift

                    if (y > dimensions.height) {
                        y = -10;
                        x = Math.random() * dimensions.width;
                    }

                    // Update twinkle effect (opacity)
                    let opacity = particle.opacity;
                    if (particle.twinkleDirection) {
                        opacity += particle.twinkleSpeed;
                        if (opacity >= 0.8) {
                            opacity = 0.8;
                            particle.twinkleDirection = false;
                        }
                    } else {
                        opacity -= particle.twinkleSpeed;
                        if (opacity <= 0.1) {
                            opacity = 0.1;
                            particle.twinkleDirection = true;
                        }
                    }

                    return {
                        ...particle,
                        x,
                        y,
                        opacity
                    };
                })
            );
        }, 16); // ~60fps

        return () => {
            clearInterval(interval);
        };
    }, [particles, dimensions]);

    // Helper function to create a particle
    const createParticle = (id: number): Particle => ({
        id,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        size: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.1,
        opacity: Math.random() * 0.7 + 0.1,
        twinkleSpeed: Math.random() * 0.01 + 0.001,
        twinkleDirection: Math.random() > 0.5
    });

    // Get particle colors from theme
    const getParticleColor = (index: number) => {
        const colors = [
            themeColors.decorative.primary,
            themeColors.decorative.secondary,
            themeColors.decorative.tertiary,
            themeColors.decorative.accent
        ];

        // Extract color values from Tailwind classes
        const colorMap: { [key: string]: string } = {
            'bg-green-600/20': 'rgba(22, 163, 74, ',
            'bg-green-400/10': 'rgba(74, 222, 128, ',
            'bg-green-500/15': 'rgba(34, 197, 94, ',
            'bg-green-600/30': 'rgba(22, 163, 74, ',
            'bg-red-600/20': 'rgba(220, 38, 38, ',
            'bg-red-400/10': 'rgba(248, 113, 113, ',
            'bg-red-500/15': 'rgba(239, 68, 68, ',
            'bg-red-600/30': 'rgba(220, 38, 38, ',
            'bg-blue-600/20': 'rgba(37, 99, 235, ',
            'bg-blue-400/10': 'rgba(96, 165, 250, ',
            'bg-blue-500/15': 'rgba(59, 130, 246, ',
            'bg-blue-600/30': 'rgba(37, 99, 235, ',
            'bg-yellow-600/20': 'rgba(202, 138, 4, ',
            'bg-yellow-400/10': 'rgba(250, 204, 21, ',
            'bg-yellow-500/15': 'rgba(234, 179, 8, ',
            'bg-yellow-600/30': 'rgba(202, 138, 4, ',
            'bg-amber-700/20': 'rgba(180, 83, 9, ',
            'bg-amber-600/10': 'rgba(217, 119, 6, ',
            'bg-amber-500/15': 'rgba(245, 158, 11, ',
            'bg-amber-700/30': 'rgba(180, 83, 9, '
        };

        const colorClass = colors[index % colors.length];
        return colorMap[colorClass] || 'rgba(34, 197, 94, ';
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {particles.map((particle, index) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: `${getParticleColor(index)}${particle.opacity})`,
                        boxShadow: `0 0 ${particle.size * 2}px ${getParticleColor(index)}${particle.opacity * 0.5})`,
                        transition: 'opacity 0.1s ease'
                    }}
                />
            ))}
        </div>
    );
}; 