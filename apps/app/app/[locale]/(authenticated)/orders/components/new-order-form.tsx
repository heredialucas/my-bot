'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@repo/design-system/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@repo/design-system/components/ui/command';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';
import { type ClientData } from '@repo/data-services/src/types';
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';

interface NewOrderFormProps {
    clients: ClientData[];
    inventory: InventoryData[];
    dictionary: Dictionary;
}

const formSchema = z.object({
    clientId: z.string().min(1, 'Client is required'),
});

export function NewOrderForm({ clients, inventory, dictionary }: NewOrderFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: '',
        },
    });

    const d = dictionary.app.admin.orders.form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{d.selectClient}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? clients.find(
                                                    (client) => client.id === field.value
                                                )?.firstName
                                                : d.selectClient}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder={d.searchClient} />
                                        <CommandList>
                                            <CommandEmpty>{d.noClientFound}</CommandEmpty>
                                            <CommandGroup>
                                                {clients.map((client) => (
                                                    <CommandItem
                                                        value={`${client.firstName} ${client.lastName}`}
                                                        key={client.id}
                                                        onSelect={() => {
                                                            form.setValue('clientId', client.id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                client.id === field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {client.firstName} {client.lastName}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Product selection and order items will go here */}

                <Button type="submit">{d.createOrder}</Button>
            </form>
        </Form>
    );
} 