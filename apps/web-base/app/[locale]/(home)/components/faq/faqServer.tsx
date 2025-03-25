// Este componente podría obtener las FAQs desde una API o servicio
import type { Dictionary } from '@repo/internationalization';
import { FaqClient } from './faqClient';


type FaqServerProps = {
    dictionary: Dictionary;
};

export async function FaqServer({ dictionary }: FaqServerProps) {
    // En un escenario real, aquí podríamos obtener las FAQs desde una base de datos
    // Por ahora, simularemos que tenemos datos dinámicos

    // Datos de usabilidad
    const usabilityFaqs = [
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

    // Datos de red
    const networkFaqs = [
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

    // En el futuro, podrías agregar aquí llamadas a un servicio API para obtener FAQs dinámicas

    return <FaqClient
        dictionary={dictionary}
        usabilityFaqs={usabilityFaqs}
        networkFaqs={networkFaqs}
    />;
} 