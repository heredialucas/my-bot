'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import type { Dictionary } from '@repo/internationalization';
import { Phone, User } from 'lucide-react';
import { useState } from 'react';
import { contact } from '../../../contact/actions/contact';

type ToCallProps = {
    dictionary: Dictionary;
};

export function ToCall({ dictionary }: ToCallProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Usamos la acción de contacto existente, pero solo con nombre y teléfono
            const result = await contact(
                `Quiere recibir llamada: ${name}`, // Prefijamos el nombre para identificar el tipo de formulario
                'netfull.cuenta.produccion@gmail.com', // Email de servicio (solo como replyTo)
                `Por favor llamar al cliente al siguiente número: ${phone}`, // Mensaje con el número
                phone // Teléfono
            );

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                setName('');
                setPhone('');
            }
        } catch (err) {
            setError(dictionary.web.contact.hero.form.error || "Ha ocurrido un error. Por favor intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-4">
                <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
                    ¡Gracias! Te contactaremos lo antes posible.
                </div>
                <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => setSuccess(false)}
                >
                    Solicitar otra llamada
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-500" />
                </div>
                <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 py-3 bg-gray-50"
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <Input
                    type="tel"
                    placeholder="Tu número de teléfono"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 py-3 bg-gray-50"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
            >
                {isSubmitting ? "Enviando..." : "Solicitar llamada"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
    );
} 