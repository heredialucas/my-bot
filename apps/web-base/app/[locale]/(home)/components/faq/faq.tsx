'use client';

import { Dictionary } from '@repo/internationalization';
import { FaqQuestion } from './faq-question';

type FaqProps = {
    dictionary: Dictionary;
};

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export const Faq = ({ dictionary }: FaqProps) => {
    // Sample FAQ data - in a real app, this would come from the dictionary
    const usabilityFaqs: FaqItem[] = [
        {
            id: 'commercial-conditions',
            question: 'Condiciones comerciales de suscripción',
            answer: 'Las condiciones comerciales de suscripción incluyen un contrato mínimo de 12 meses, instalación gratuita y servicio técnico incluido. Consulta nuestros términos y condiciones para más detalles.'
        },
        {
            id: 'router-password',
            question: '¿Por qué es recomendable mantener la clave que trae mi router?',
            answer: 'Es recomendable mantener la clave original del router ya que está optimizada para la seguridad de tu red. Además, facilita la asistencia técnica en caso de necesitar soporte.'
        },
        {
            id: 'new-wifi-password',
            question: '¿Cómo puedo obtener una nueva clave de WiFi?',
            answer: 'Puedes solicitar una nueva clave WiFi a través de nuestra app móvil, contactando con servicio al cliente o mediante el panel de administración de tu router.'
        }
    ];

    const networkFaqs: FaqItem[] = [
        {
            id: 'network-considerations',
            question: 'Consideraciones de red 2.4 y 5G',
            answer: 'La red 2.4GHz ofrece mayor alcance pero menor velocidad, ideal para dispositivos alejados. La red 5GHz proporciona mayor velocidad en distancias cortas, perfecta para streaming y gaming.'
        },
        {
            id: 'ip-type',
            question: '¿Qué tipo de IP tiene la red Netfull Fibra?',
            answer: 'El servicio Netfull Fibra proporciona una dirección IP dinámica por defecto. También ofrecemos la opción de contratar una IP fija para necesidades específicas.'
        },
        {
            id: 'nat-service',
            question: '¿Qué NAT entrega el servicio Netfull Fibra?',
            answer: 'El servicio Netfull Fibra utiliza NAT tipo 2, lo que permite una buena conectividad para la mayoría de aplicaciones y juegos online.'
        },
        {
            id: 'ont-ports',
            question: '¿Puedo configurar los puertos de mi ONT?',
            answer: 'Sí, puedes configurar los puertos de tu ONT a través del panel de administración. Para acceder, conecta un dispositivo a tu red y accede a la dirección IP del ONT en tu navegador.'
        }
    ];

    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
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
                    <h2 className="text-4xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                </div>

                {/* Categories and Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Usability Category */}
                    <div>
                        <h3 className="text-2xl font-bold text-indigo-600 mb-6">Usabilidad</h3>
                        <div className="space-y-4">
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
                        <h3 className="text-2xl font-bold text-indigo-600 mb-6">Red</h3>
                        <div className="space-y-4">
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
}; 