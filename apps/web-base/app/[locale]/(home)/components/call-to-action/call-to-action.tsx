'use client';

import { Dictionary } from '@repo/internationalization';
import { Button } from '@repo/design-system/components/ui/button';

type CallToActionProps = {
    dictionary: Dictionary;
};

export const CallToAction = ({ dictionary }: CallToActionProps) => {
    return (
        <div className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-black">
                            ¿Aún no eres cliente
                        </span>
                    </h2>
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">
                            fibra óptica NetFull?
                        </span>
                    </h2>
                    <p className="text-base text-gray-700 mb-8">
                        Revisa tu cobertura y contrata Internet Hogar
                    </p>
                    <Button
                        className="bg-cyan-300 hover:bg-cyan-400 text-blue-900 font-semibold py-3 px-8 rounded-md text-lg"
                        onClick={() => { }}
                    >
                        Contratar
                    </Button>
                </div>
            </div>
        </div>
    );
}; 