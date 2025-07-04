'use client';

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type ClientData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { clientFormSchema, ClientFormSchema } from '../lib/schemas';
import { createClientAction, updateClientAction } from '../actions';
import { useRef, useState, useTransition } from 'react';

interface ClientFormProps {
    client?: ClientData;
    onSuccess: () => void;
    dictionary: Dictionary;
}

export function ClientForm({ client, onSuccess, dictionary }: ClientFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<ClientFormSchema>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            firstName: client?.firstName || '',
            lastName: client?.lastName || '',
            email: client?.email || '',
            phone: client?.phone || '',
            address: client?.address || '',
        },
    });

    const onSubmit = (values: ClientFormSchema) => {
        startTransition(async () => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, String(value));
                }
            });

            const action = client
                ? updateClientAction.bind(null, client.id)
                : createClientAction;

            const result = await action(formData);

            toast({
                title: result.success ? 'Éxito' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });

            if (result.success) {
                onSuccess();
            }
        });
    };

    return (
        <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.app.admin.clients.form.name}</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.app.admin.clients.form.lastName}</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.app.admin.clients.form.email}</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.app.admin.clients.form.phone}</FormLabel>
                            <FormControl>
                                <Input placeholder="+123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.app.admin.clients.form.address}</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Guardando...' : client ? 'Actualizar' : 'Crear'}
                </Button>
            </form>
        </Form>
    );
} 