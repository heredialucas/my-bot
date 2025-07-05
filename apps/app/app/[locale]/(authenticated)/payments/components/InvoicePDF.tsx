import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';
import type { PaymentData } from './columns';

// Registrar fuentes (opcional, pero mejora la apariencia)
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 'normal' },
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfB.ttf', fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        textAlign: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 10,
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 10,
        color: '#374151',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 10,
        color: '#111827',
    },
    valueBold: {
        fontSize: 10,
        color: '#111827',
        fontWeight: 'bold',
    },
    valueGreen: {
        fontSize: 10,
        color: '#059669',
        fontWeight: 'bold',
    },
    valueOrange: {
        fontSize: 10,
        color: '#ea580c',
        fontWeight: 'bold',
    },
    itemsTable: {
        marginTop: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottom: '1px solid #f3f4f6',
    },
    itemName: {
        fontSize: 10,
        color: '#111827',
        flex: 1,
    },
    itemSku: {
        fontSize: 8,
        color: '#6b7280',
        marginTop: 2,
    },
    itemQuantity: {
        fontSize: 10,
        color: '#111827',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    summary: {
        marginTop: 20,
        paddingTop: 15,
        borderTop: '2px solid #e5e7eb',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#6b7280',
    },
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(amount);
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

const paymentMethodLabels = {
    CASH: 'Efectivo',
    CREDIT_CARD: 'Tarjeta de Crédito',
    BANK_TRANSFER: 'Transferencia Bancaria',
    OTHER: 'Otro método'
};

type InvoicePDFProps = {
    payment: PaymentData;
};

export function InvoicePDF({ payment }: InvoicePDFProps) {
    const totalItems = payment.order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const isPartialPayment = payment.amount < payment.order.totalAmount;
    const pendingAmount = payment.order.totalAmount - payment.amount;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.title}>Repartito</Text>
                    <Text style={styles.subtitle}>Sistema de Gestión de Repartos</Text>
                </View>

                {/* Información del Pago */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Datos del Pago</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Pago:</Text>
                        <Text style={styles.value}>{formatDate(payment.paymentDate)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Monto:</Text>
                        <Text style={styles.valueGreen}>{formatCurrency(payment.amount)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Método de Pago:</Text>
                        <Text style={styles.value}>{paymentMethodLabels[payment.paymentMethod]}</Text>
                    </View>
                    {payment.receiptNumber && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Número de Recibo:</Text>
                            <Text style={styles.value}>{payment.receiptNumber}</Text>
                        </View>
                    )}
                    {payment.notes && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Notas:</Text>
                            <Text style={styles.value}>{payment.notes}</Text>
                        </View>
                    )}
                </View>

                {/* Información del Cliente */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información del Cliente</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>{payment.order.client.firstName} {payment.order.client.lastName}</Text>
                    </View>
                    {payment.order.client.email && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{payment.order.client.email}</Text>
                        </View>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.label}>Vendedor:</Text>
                        <Text style={styles.value}>{payment.order.seller.name} {payment.order.seller.lastName}</Text>
                    </View>
                </View>

                {/* Información del Reparto */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información del Reparto</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>ID del Reparto:</Text>
                        <Text style={styles.value}>{payment.order.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha del Reparto:</Text>
                        <Text style={styles.value}>{formatDate(payment.order.orderDate)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total del Reparto:</Text>
                        <Text style={styles.valueBold}>{formatCurrency(payment.order.totalAmount)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Pagado:</Text>
                        <Text style={styles.valueGreen}>{formatCurrency(payment.amount)}</Text>
                    </View>
                    {isPartialPayment && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Pendiente:</Text>
                            <Text style={styles.valueOrange}>{formatCurrency(pendingAmount)}</Text>
                        </View>
                    )}
                </View>

                {/* Productos del Reparto */}
                {payment.order.items && payment.order.items.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Productos del Reparto</Text>
                        <View style={styles.itemsTable}>
                            {payment.order.items.map((item, index) => (
                                <View key={index} style={styles.itemRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemName}>{item.product.name}</Text>
                                        <Text style={styles.itemSku}>SKU: {item.product.sku}</Text>
                                    </View>
                                    <Text style={styles.itemQuantity}>{item.quantity} unidades</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.summary}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Total de productos:</Text>
                                <Text style={styles.valueBold}>{totalItems} unidades</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Resumen del Pago */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen del Pago</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Monto Pagado:</Text>
                        <Text style={styles.valueGreen}>{formatCurrency(payment.amount)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Generación:</Text>
                        <Text style={styles.value}>{formatDate(new Date())}</Text>
                    </View>
                </View>

                {/* Pie de página */}
                <View style={styles.footer}>
                    <Text>Gracias por su pago</Text>
                    <Text>Repartito - Sistema de Gestión de Repartos</Text>
                </View>
            </Page>
        </Document>
    );
} 