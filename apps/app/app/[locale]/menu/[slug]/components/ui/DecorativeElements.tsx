'use client';

import React from 'react';

interface DecorativeElementsProps {
    themeColors: {
        decorative: {
            primary: string;
            secondary: string;
            tertiary: string;
            accent: string;
        };
    };
    variant?: 'background' | 'section' | 'minimal' | 'hero';
    className?: string;
}

export default function DecorativeElements({
    themeColors,
    variant = 'background',
    className = ''
}: DecorativeElementsProps) {
    const renderElements = () => {
        switch (variant) {
            case 'hero':
                return (
                    <>
                        {/* Elementos como en web-base hero */}
                        <div className={`absolute -top-10 right-1/4 w-20 h-20 ${themeColors.decorative.primary} dark:${themeColors.decorative.secondary} rounded-full blur-xl`}></div>
                        <div className={`absolute bottom-10 left-1/3 w-32 h-32 ${themeColors.decorative.secondary} dark:${themeColors.decorative.tertiary} rounded-full blur-2xl`}></div>
                    </>
                );

            case 'section':
                return (
                    <>
                        {/* Elementos como en web-base features */}
                        <div className={`absolute -left-10 top-1/2 w-40 h-40 ${themeColors.decorative.primary} dark:${themeColors.decorative.secondary} rounded-full blur-2xl`}></div>
                        <div className={`absolute right-20 bottom-1/4 w-32 h-32 ${themeColors.decorative.secondary} dark:${themeColors.decorative.tertiary} rounded-full blur-xl`}></div>
                        <div className={`absolute top-1/3 left-1/4 w-1 h-1 ${themeColors.decorative.accent} dark:${themeColors.decorative.accent} rounded-full`}></div>
                        <div className={`absolute bottom-1/4 right-1/3 w-2 h-2 ${themeColors.decorative.accent} dark:${themeColors.decorative.accent} rounded-full`}></div>
                    </>
                );

            case 'background':
                return (
                    <>
                        {/* Elementos como en web-base footer */}
                        <div className={`absolute bottom-0 left-1/4 w-96 h-96 ${themeColors.decorative.primary} dark:${themeColors.decorative.primary} rounded-full blur-3xl`}></div>
                        <div className={`absolute top-1/2 right-1/4 w-72 h-72 ${themeColors.decorative.secondary} dark:${themeColors.decorative.secondary} rounded-full blur-2xl`}></div>
                    </>
                );

            case 'minimal':
                return (
                    <>
                        {/* Elementos pequeños sutiles */}
                        <div className={`absolute top-1/4 left-1/6 w-2 h-2 ${themeColors.decorative.accent} dark:${themeColors.decorative.accent} rounded-full`}></div>
                        <div className={`absolute bottom-1/3 right-1/5 w-1 h-1 ${themeColors.decorative.accent} dark:${themeColors.decorative.accent} rounded-full`}></div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {renderElements()}
        </div>
    );
} 