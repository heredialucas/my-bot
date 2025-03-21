'use client';

import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';

type AboutPageContentProps = {
    dictionary: Dictionary;
};

export const AboutPageContent = ({ dictionary }: AboutPageContentProps) => {
    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto max-w-6xl">
                {/* Hero Section */}
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                                    {dictionary.web.about.title}
                                </h1>
                                <p className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight">
                                    {dictionary.web.about.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-60 w-full overflow-hidden rounded-lg md:h-80">
                        <Image
                            src="/images/about/team.jpg"
                            alt={dictionary.web.about.imageAlt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Mission and Values */}
                <div className="mt-20">
                    <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter md:text-4xl">
                        {dictionary.web.about.missionTitle}
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
                        {dictionary.web.about.missionText}
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        {dictionary.web.about.values.map((value, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 rounded-lg border p-6 transition-all duration-200 hover:shadow-md"
                            >
                                <h3 className="text-xl font-semibold">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mt-20">
                    <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter md:text-4xl">
                        {dictionary.web.about.teamTitle}
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
                        {dictionary.web.about.teamSubtitle}
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {dictionary.web.about.team.map((member, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 text-center">
                                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                                    <Image
                                        src={member.image || '/images/about/placeholder.jpg'}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 flex flex-col items-center gap-6 text-center">
                    <h2 className="max-w-xl text-3xl font-bold tracking-tighter md:text-4xl">
                        Ready to transform your business?
                    </h2>
                    <p className="max-w-md text-lg text-muted-foreground">
                        Get in touch with our team to learn how we can help you succeed.
                    </p>
                    <Button className="mt-4 gap-2">
                        {dictionary.web.global.primaryCta} <MoveRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}; 