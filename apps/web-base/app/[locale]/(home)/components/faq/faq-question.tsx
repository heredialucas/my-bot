'use client';

import { useState } from 'react';

type QuestionProps = {
    question: string;
    answer: string;
};

export const FaqQuestion = ({ question, answer }: QuestionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Custom accordion without the default arrow
    return (
        <div className="mb-3 sm:mb-4">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between p-3 sm:p-6 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-all cursor-pointer"
                style={{ borderBottomLeftRadius: isOpen ? 0 : undefined, borderBottomRightRadius: isOpen ? 0 : undefined }}
            >
                <span className="text-sm sm:text-base text-gray-800 font-medium">{question}</span>
                <div className="bg-indigo-600 rounded-full p-2 sm:p-3 flex items-center justify-center ml-2 sm:ml-4 flex-shrink-0">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="sm:w-5 sm:h-5"
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
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-3 sm:px-6">
                    <div className="py-3 sm:py-4 max-h-[250px] sm:max-h-[400px] overflow-y-auto whitespace-pre-line text-xs sm:text-sm">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
}; 