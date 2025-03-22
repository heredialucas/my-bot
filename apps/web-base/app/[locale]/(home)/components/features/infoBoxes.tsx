import { useState } from "react";
import { FileText, Wifi } from "lucide-react";
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
                            {/* Content in 2 columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.billingContent[0]}</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.billingContent[1]}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.billingContent[2]}</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.billingContent[3]}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {dictionary.web.home.cases.infoBoxes.payNow}
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
                            {/* Content in 2 columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Wifi className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.fiberPlansContent[0]}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Wifi className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.fiberPlansContent[1]}</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <Wifi className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm">{dictionary.web.home.cases.infoBoxes.fiberPlansContent[2]}</p>
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
