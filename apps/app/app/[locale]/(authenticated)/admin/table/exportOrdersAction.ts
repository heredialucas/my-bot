'use server';

import { getAllOrders } from '@repo/data-services/src/services/barfer/getAllOrders';
import * as XLSX from 'xlsx';

interface ExportParams {
    search?: string;
    from?: string;
    to?: string;
    orderType?: string;
}

export async function exportOrdersAction({
    search = '',
    from = '',
    to = '',
    orderType = '',
}: ExportParams): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
        const orders = await getAllOrders({
            search: search || '',
            sorting: [{ id: 'createdAt', desc: true }],
            from: from || undefined,
            to: to || undefined,
            orderType: orderType && orderType !== 'all' ? orderType : undefined,
        });

        if (orders.length === 0) {
            return { success: false, error: 'No se encontraron órdenes para exportar con los filtros seleccionados.' };
        }

        // Mapeo y aplanamiento de los datos para el Excel
        const dataToExport = orders.map(order => ({
            'Fecha': new Date(order.createdAt).toLocaleDateString('es-AR'),
            'Cliente': `${order.user?.name || ''} ${order.user?.lastName || ''}`.trim(),
            'Email': order.user?.email || '',
            'Telefono': order.address?.phone || '',
            'Direccion': `${order.address?.address || ''}, ${order.address?.city || ''}`,
            'Notas Cliente': order.notes || '',
            'Notas Propias': order.notesOwn || '',
            'Items': order.items.map(item => `${item.name} x${(item.options[0] as any)?.quantity || 1}`).join('\n'),
            'Medio de Pago': order.paymentMethod || '',
            'Estado': order.status,
            'Total': order.total,
        }));

        // Crear el libro de trabajo y la hoja
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        // Ajustar el ancho de las columnas
        const columnWidths = [
            { wch: 12 }, // Fecha
            { wch: 30 }, // Cliente
            { wch: 30 }, // Email
            { wch: 15 }, // Telefono
            { wch: 40 }, // Direccion
            { wch: 40 }, // Notas Cliente
            { wch: 40 }, // Notas Propias
            { wch: 60 }, // Items (más ancho para productos en líneas separadas)
            { wch: 20 }, // Medio de Pago
            { wch: 15 }, // Estado
            { wch: 12 }, // Total
        ];
        worksheet['!cols'] = columnWidths;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Órdenes');

        // Generar el buffer del archivo y convertirlo a base64 para serialización
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        const base64Data = buffer.toString('base64');

        return { success: true, data: base64Data };

    } catch (error) {
        console.error('Error exporting orders:', error);
        return { success: false, error: 'Ocurrió un error al generar el archivo Excel.' };
    }
} 