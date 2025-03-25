'use client';

import { Dictionary } from '@repo/internationalization';
import { FaqQuestion } from './faq-question';

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

type FaqClientProps = {
    dictionary: Dictionary;
    usabilityFaqs: FaqItem[];
    networkFaqs: FaqItem[];
};

export function FaqClient({ dictionary, usabilityFaqs, networkFaqs }: FaqClientProps) {
    return (
        <div className="w-full py-8 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-12">
                    <div className="bg-black rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sm:w-8 sm:h-8"
                        >
                            <path
                                d="M16 29.3334C23.3638 29.3334 29.3334 23.3638 29.3334 16C29.3334 8.63622 23.3638 2.66669 16 2.66669C8.63622 2.66669 2.66669 8.63622 2.66669 16C2.66669 18.4134 3.30335 20.6834 4.41735 22.6534L3.42269 28.5774L9.34669 27.5827C11.3167 28.6967 13.5867 29.3334 16 29.3334Z"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16 16V16.0133"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 16V16.0133"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 16V16.0133"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                </div>

                {/* Categories and Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
                    {/* Usability Category */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 sm:mb-6">Usabilidad</h3>
                        <div className="space-y-3 sm:space-y-4">
                            {usabilityFaqs.map((faq) => (
                                <FaqQuestion
                                    key={faq.id}
                                    value={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Network Category */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 sm:mb-6">Red</h3>
                        <div className="space-y-3 sm:space-y-4">
                            {networkFaqs.map((faq) => (
                                <FaqQuestion
                                    key={faq.id}
                                    value={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 