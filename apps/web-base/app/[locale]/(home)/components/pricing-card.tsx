import { Button } from '@repo/design-system/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type PricingCardProps = {
    discount: number;
    months: number;
    planType: string;
    speed: number;
    price: number;
    originalPrice: number;
    isNewCustomer?: boolean;
    includeWifiExtender?: boolean;
    includeInternetTV?: boolean;
    showZappingButton?: boolean;
};

export const PricingCard = ({
    discount,
    months,
    planType,
    speed,
    price,
    originalPrice,
    isNewCustomer = true,
    includeWifiExtender = false,
    includeInternetTV = false,
    showZappingButton = false,
}: PricingCardProps) => {
    // Fixed base prices from the image
    const basePrices = {
        120: 14990,
        300: 16780,
        500: 19410,
    };

    const wifiExtenderPrice = 2400;
    const basePrice = basePrices[speed as keyof typeof basePrices];

    return (
        <div className="flex flex-col rounded-lg bg-white shadow-md overflow-hidden h-full">
            <div
                className="py-4 px-4 text-center text-white font-medium"
                style={{
                    background: 'linear-gradient(90deg, #4646ff 0%, #33ccff 100%)'
                }}
            >
                <div className="text-2xl font-bold">{discount}% DESCUENTO</div>
                <div className="text-xl">X {months} MESES</div>
                {isNewCustomer && <div className="text-sm mt-1">Promoción clientes nuevos</div>}
            </div>

            <div className="flex flex-col items-center p-6 pt-4 flex-grow">
                <div className="text-center mb-3">
                    <div className="text-gray-800 text-lg">Plan {planType}</div>
                    <div className="text-indigo-600 text-3xl font-bold">Fibra {speed}</div>
                </div>

                <div className="text-center mb-2">
                    <div className="text-gray-700">Mensual</div>
                    <div className="text-indigo-600 text-4xl font-bold">${price.toLocaleString('es-CL')}</div>
                    <div className="text-xs text-gray-500">Mes {months} pagás ${originalPrice.toLocaleString('es-CL')}</div>
                </div>

                {/* Service details section - only show when wifi extender is included */}
                {includeWifiExtender && (
                    <div className="w-full mt-3 mb-6">
                        <div className="text-gray-600 text-sm font-medium mb-1">Detalles del servicio</div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                            <span className="text-gray-500">• Fibra {speed}</span>
                            <span className="text-gray-700">${basePrice.toLocaleString('es-CL')}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">• Extensor Wifi</span>
                            <span className="text-gray-700">${wifiExtenderPrice.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                )}

                <div className="mt-auto w-full space-y-3">
                    <Button
                        className="w-full rounded-full bg-cyan-300 text-black hover:bg-cyan-400 font-medium text-sm py-2 h-auto"
                    >
                        Revisar factibilidad
                    </Button>

                    <Link
                        href="#"
                        className="flex items-center justify-center text-indigo-600 text-sm px-4 py-2 rounded-full border border-indigo-600 w-full"
                    >
                        Ver lo que incluye <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>

                    {showZappingButton && (
                        <Button
                            className="w-full rounded-full bg-rose-500 text-white hover:bg-rose-600 font-medium text-sm py-2 h-auto"
                        >
                            Elegí tu plan de Zapping
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}; 