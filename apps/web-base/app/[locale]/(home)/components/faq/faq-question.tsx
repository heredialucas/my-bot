'use client';

import { useState } from 'react';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@repo/design-system/components/ui/accordion';

type QuestionProps = {
    question: string;
    answer: string;
    value: string;
};

export const FaqQuestion = ({ question, answer, value }: QuestionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Custom accordion without the default arrow
    return (
        <div className="mb-4">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between p-6 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-all cursor-pointer"
                style={{ borderBottomLeftRadius: isOpen ? 0 : undefined, borderBottomRightRadius: isOpen ? 0 : undefined }}
            >
                <span className="text-gray-800 font-medium">{question}</span>
                <div className="bg-black rounded-full p-3 flex items-center justify-center ml-4">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <path
                            d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-6">
                    <div className="py-4">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
}; 