import { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, Mail, Wifi, Tv, Link, HelpCircle, AlertCircle, CreditCard } from "lucide-react";
import { Dictionary } from "@repo/internationalization";

export const InfoBoxes = ({ dictionary }: { dictionary: Dictionary }) => {
    const [isZappingPlansOpen, setIsZappingPlansOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isFiberPlansOpen, setIsFiberPlansOpen] = useState(false);

    return (
        <div className="flex flex-col space-y-3 md:space-y-5 max-w-[800px] mx-auto">
            {/* Zappgin Plans Accordion */}
            <div className="w-full">
                <div className="border-2 rounded-lg md:rounded-xl overflow-hidden">
                    <div
                        className="p-4 md:p-6 text-sm md:text-md flex w-full items-center justify-between hover:bg-gray-50 border-0 cursor-pointer"
                        onClick={() => setIsZappingPlansOpen(!isZappingPlansOpen)}
                    >
                        {"Servicio de Streaming Zapping TV - Información y Condiciones"}
                        <div className="bg-indigo-600 rounded-full p-2 md:p-3 flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 md:w-5 md:h-5 ${isZappingPlansOpen ? 'rotate-90' : 'rotate-0'}`}
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
                    {isZappingPlansOpen && (
                        <div className="px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6 bg-gray-50 md:bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Tv className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            Los clientes NETFULL FIBRA que cumplan con las condiciones comerciales pueden pagar la suscripción del servicio ZAPPING en la boleta mensual NETFULL FIBRA.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Link className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            Al contratar ZAPPING estás aceptando los términos y condiciones de Zapping (<a href="https://www.zapping.com/ayuda/terminos-y-condiciones" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">ver aquí</a>).
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            El cobro del servicio se hará por mes completo. Aparecerá en los documentos de cobro de NETFULL FIBRA como "ZAPPING" en sección "Otros Cargos", independientemente de que el cliente cancele la suscripción antes de cumplido el mes.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            NETFULL FIBRA es únicamente recaudador de los pagos a realizarse ante ZAPPING. Cualquier incidencia en la prestación del servicio es exclusiva responsabilidad de ZAPPING.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <FileText className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            El servicio ZAPPING es un servicio de streaming (televisión Online) de propiedad y gestionado por ZAPPING. La calidad y contenido de los vídeos disponibles es responsabilidad absoluta de ZAPPING.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            El cliente puede dar término o cancelar la suscripción en cualquier momento llamando al servicio postventa de NETFULL FIBRA al +56994833938 o directamente en sucursal virtual. El servicio será desactivado al término del ciclo de facturación.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Wifi className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            El uso del servicio de ZAPPING requiere de conexión a internet y de un dispositivo compatible. Max plan básico con anuncios. TNT Sports Premium incluye sólo un dispositivo en simultáneo.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <div className="text-xs md:text-sm">
                                            <p className="mb-2">Para problemas con el servicio ZAPPING, visita su <a href="https://www.zapping.com/ayuda" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">centro de ayuda</a>. Atención disponible vía:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Chat: Bot 24h / Ejecutivo 9-23h</li>
                                                <li>Email: contacto@zapping.com (24h)</li>
                                                <li>Tiempo máximo de respuesta: 2 días hábiles</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Billing Accordion */}
            <div className="w-full">
                <div className="border-2 rounded-lg md:rounded-xl overflow-hidden">
                    <div
                        className="p-4 md:p-6 text-sm md:text-md flex w-full items-center justify-between hover:bg-gray-50 border-0 cursor-pointer"
                        onClick={() => setIsBillingOpen(!isBillingOpen)}
                    >
                        {dictionary.web.home.cases.infoBoxes.billing}
                        <div className="bg-indigo-600 rounded-full p-2 md:p-3 flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 md:w-5 md:h-5 ${isBillingOpen ? 'rotate-90' : 'rotate-0'}`}
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
                        <div className="px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6 bg-gray-50 md:bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <FileText className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            {dictionary.web.home.cases.infoBoxes.billingContent && dictionary.web.home.cases.infoBoxes.billingContent[0] ||
                                                "Tu servicio considera cobro vencido, es decir, el periodo de facturación de tu boleta inicia el día que se instala del mes en curso hasta 30 días después."}
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Mail className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            La boleta se distribuye por email 15 días antes del día de pago.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            Si tu servicio fue suspendido por no pago y pagas tu deuda, la reactivación de éste se realizará como máximo dentro de las 24hrs siguientes al pago.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            Si tu servicio fue suspendido por no pago y pagas tu deuda, la reactivación de éste se realizará como máximo dentro de las 24hrs siguientes al pago.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="rounded-full bg-gray-100 p-2 md:p-2">
                                                <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            En caso de no pago, tu servicio se suspenderá 5 días después de la fecha máxima de pago, es decir, si tu fecha de pago son los 01 tu servicio será suspendido el día 06 a las 09:00 aplicando el costo de corte y reposición.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fiber Plans Accordion */}
            <div className="w-full">
                <div className="border-2 rounded-lg md:rounded-xl overflow-hidden">
                    <div
                        className="p-4 md:p-6 text-sm md:text-md flex w-full items-center justify-between hover:bg-gray-50 border-0 cursor-pointer"
                        onClick={() => setIsFiberPlansOpen(!isFiberPlansOpen)}
                    >
                        {dictionary.web.home.cases.infoBoxes.fiberPlans}
                        <div className="bg-indigo-600 rounded-full p-2 md:p-3 flex items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 md:w-5 md:h-5 ${isFiberPlansOpen ? 'rotate-90' : 'rotate-0'}`}
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
                        <div className="px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6 bg-gray-50 md:bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
                                                <rect width="40" height="40" rx="20" fill="#F3F4F6" />
                                                <path d="M25 15H15C14.4477 15 14 15.4477 14 16V23C14 23.5523 14.4477 24 15 24H25C25.5523 24 26 23.5523 26 23V16C26 15.4477 25.5523 15 25 15Z"
                                                    stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 27H23" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 24V27" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            {dictionary.web.home.cases.infoBoxes.fiberPlansContent && dictionary.web.home.cases.infoBoxes.fiberPlansContent[0] ||
                                                "La velocidad se comparte entre los dispositivos que tienes conectados simultáneamente. Además la cobertura de red se puede ver afectada mientras más dispositivos tengas conectados al mismo tiempo."}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
                                                <rect width="40" height="40" rx="20" fill="#F3F4F6" />
                                                <path d="M20 14C23.866 14 27 17.134 27 21" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 17C22.2091 17 24 18.7909 24 21" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 24H20.01" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 14C13 14 17 18 17 21C17 24 13 28 13 28" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 21H17" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-xs md:text-sm">
                                            La señal de WIFI podrá verse obstaculizada por muros, vidrios, entre otras cosas. Además la cercanía con otros dispositivos electrónicos pueden causar interferencia en la señal.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
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
                                        <p className="text-xs md:text-sm">
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
