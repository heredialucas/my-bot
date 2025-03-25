import { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, Mail, Wifi } from "lucide-react";
import { Button } from "@repo/design-system/components/ui/button";
import { Dictionary } from "@repo/internationalization";

export const InfoBoxes = ({ dictionary }: { dictionary: Dictionary }) => {
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isFiberPlansOpen, setIsFiberPlansOpen] = useState(false);

    return (
        <div className="flex flex-col space-y-5 max-w-[800px] mx-auto">
            {/* Billing Accordion */}
            <div className="w-full">
                <div className="border-2 rounded-xl overflow-hidden">
                    <div
                        className="p-6 text-md flex w-full items-center justify-between hover:bg-gray-50 border-0 cursor-pointer"
                        onClick={() => setIsBillingOpen(!isBillingOpen)}
                    >
                        {dictionary.web.home.cases.infoBoxes.billing}
                        <div className="bg-indigo-600 rounded-full p-3 flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 ${isBillingOpen ? 'rotate-90' : 'rotate-0'}`}
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
                    </div>
                    {isBillingOpen && (
                        <div className="px-6 pb-6 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            Tu servicio considera cobro vencido, es decir, el periodo de facturación de tu boleta inicia el día que se instala del mes en curso hasta 30 días después. Recuerda que al momento de instalar se cancela ($) el monto convenido por proceso de habilitación. Este monto es equivalente al plan a contratar. Para dueños de casa solo cancela el plan, para arrendatarios o extranjeros cancelas el plan + $10.000 al momento de instalar. Para modificar la fecha debes contactarnos directamente via teléfonica. Estas solicitudes NO serán consideradas si utilizas otro medio de comunicación (WhatsApp, mensajes de texto, entre otros).
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            La boleta se distribuye por email 15 días antes del día de pago.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            Si tu servicio fue suspendido por no pago y pagas tu deuda, la reactivación de éste se realizará como máximo dentro de las 24hrs siguientes al pago.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <DollarSign className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            Si tu servicio fue suspendido por no pago y pagas tu deuda, la reactivación de éste se realizará como máximo dentro de las 24hrs siguientes al pago.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            En caso de no pago, tu servicio se suspenderá 5 días después de la fecha máxima de pago, es decir, si tu fecha de pago son los 01 tu servicio será suspendido el día 06 a las 09:00 aplicando el costo de corte y reposición.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg">
                                    <a href="#" className="flex items-center gap-2">
                                        <span className="text-base font-medium">Paga aquí</span>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fiber Plans Accordion */}
            <div className="w-full">
                <div className="border-2 rounded-xl overflow-hidden">
                    <div
                        className="p-6 text-md flex w-full items-center justify-between hover:bg-gray-50 border-0 cursor-pointer"
                        onClick={() => setIsFiberPlansOpen(!isFiberPlansOpen)}
                    >
                        {dictionary.web.home.cases.infoBoxes.fiberPlans}
                        <div className="bg-indigo-600 rounded-full p-3 flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 ${isFiberPlansOpen ? 'rotate-90' : 'rotate-0'}`}
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
                    </div>
                    {isFiberPlansOpen && (
                        <div className="px-6 pb-6 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="#F3F4F6" />
                                                <path d="M25 15H15C14.4477 15 14 15.4477 14 16V23C14 23.5523 14.4477 24 15 24H25C25.5523 24 26 23.5523 26 23V16C26 15.4477 25.5523 15 25 15Z"
                                                    stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 27H23" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 24V27" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-sm">
                                            La velocidad se comparte entre los dispositivos que tienes conectados simultáneamente. Además la cobertura de red se puede ver afectada mientras más dispositivos tengas conectados al mismo tiempo.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="#F3F4F6" />
                                                <path d="M20 14C23.866 14 27 17.134 27 21" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 17C22.2091 17 24 18.7909 24 21" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 24H20.01" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 14C13 14 17 18 17 21C17 24 13 28 13 28" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 21H17" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-sm">
                                            La señal de WIFI podrá verse obstaculizada por muros, vidrios, entre otras cosas. Además la cercanía con otros dispositivos electrónicos pueden causar interferencia en la señal.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="#F3F4F6" />
                                                <path d="M14 16C14 15.4477 14.4477 15 15 15H25C25.5523 15 26 15.4477 26 16V20C26 20.5523 25.5523 21 25 21H15C14.4477 21 14 20.5523 14 20V16Z"
                                                    stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 24H14.01" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 24H17.01" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 24H20.01" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 27L16 25" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19 27L21 25" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M24 27L26 25" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-sm">
                                            La señal se debilita a medida que te alejas del router, es por eso que la velocidad de navegación se ve afectada.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
