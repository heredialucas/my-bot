'use client';

import { useState, useEffect } from 'react';
import { SnowParticles } from './SnowParticles';

interface SnowParticlesWrapperProps {
    themeColors: {
        decorative: {
            primary: string;
            secondary: string;
            tertiary: string;
            accent: string;
        };
    };
    count?: number;
}

export const SnowParticlesWrapper = ({ themeColors, count = 70 }: SnowParticlesWrapperProps) => {
    const [mounted, setMounted] = useState(false);

    // Only show particles after mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <SnowParticles themeColors={themeColors} count={count} />;
}; 