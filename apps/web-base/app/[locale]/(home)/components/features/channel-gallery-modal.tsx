"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { NationalImages, PlusImages, CineImages, FutbolImages, Channel } from './images';

interface ChannelGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    channelSet?: 'national' | 'football' | 'plus' | 'cine';
}

export const ChannelGalleryModal = ({
    isOpen,
    onClose,
    title,
    channelSet = 'national'
}: ChannelGalleryModalProps) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Select channels array based on channelSet prop
    let channels: Channel[];
    // Set dynamic title based on channelSet if not provided
    let modalTitle = title;

    switch (channelSet) {
        case 'cine':
            channels = CineImages;
            modalTitle = modalTitle || "CANALES CINE";
            break;
        case 'plus':
            channels = PlusImages;
            modalTitle = modalTitle || "CANALES PLUS";
            break;
        case 'football':
            channels = FutbolImages;
            modalTitle = modalTitle || "CANALES FÚTBOL";
            break;
        case 'national':
        default:
            channels = NationalImages;
            modalTitle = modalTitle || "CANALES NACIONALES";
            break;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#111111] rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 flex items-center justify-between p-3 bg-[#111111] z-10 border-b border-gray-800">
                    <h2 className="text-white text-lg font-semibold">{modalTitle}</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-0.5 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-0.5">
                    {channels.map((channel, index) => (
                        <div key={index} className="flex justify-center items-center h-14 md:h-16">
                            <Image
                                src={channel.logo}
                                alt={channel.nombre}
                                width={80}
                                height={56}
                                className="object-contain max-h-full p-1"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 