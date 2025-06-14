// Función para obtener colores del tema
export function getThemeColors(theme: string) {
    const themes = {
        green: {
            bg: 'bg-green-600',
            text: 'text-white',
            accent: 'text-green-600'
        },
        red: {
            bg: 'bg-red-600',
            text: 'text-white',
            accent: 'text-red-600'
        },
        blue: {
            bg: 'bg-blue-600',
            text: 'text-white',
            accent: 'text-blue-600'
        },
        yellow: {
            bg: 'bg-yellow-600',
            text: 'text-white',
            accent: 'text-yellow-600'
        },
        brown: {
            bg: 'bg-amber-700',
            text: 'text-white',
            accent: 'text-amber-700'
        }
    };

    return themes[theme as keyof typeof themes] || themes.green;
}

// Función para generar enlace de WhatsApp
export function generateWhatsAppLink(phone: string, message?: string): string {
    if (!phone) return '';

    // Limpiar el número de teléfono (remover espacios, guiones, paréntesis)
    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    // Mensaje por defecto
    const defaultMessage = '¡Hola! Vi su menú y me gustaría hacer una consulta.';
    const finalMessage = message || defaultMessage;

    // Crear URL de WhatsApp
    const encodedMessage = encodeURIComponent(finalMessage);
    return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedMessage}`;
}

// Función para generar mensaje personalizado de WhatsApp para un plato
export function generateWhatsAppLinkForDish(phone: string, dishName: string, restaurantName: string): string {
    const message = `¡Hola ${restaurantName}! Me interesa el plato "${dishName}" que vi en su menú.`;
    return generateWhatsAppLink(phone, message);
} 