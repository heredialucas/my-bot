'use client';

import { getClientsByCategory } from '@repo/data-services/src/services/clientService';
import { EmailClientsViewClient } from './EmailClientsViewClient';
import type { Dictionary } from '@repo/internationalization';
import type { ClientForTable } from '@repo/data-services/src/services/repartito/analytics/getClientsByCategory';
import type { EmailTemplateData } from '@repo/data-services';
import { getEmailTemplates } from '@repo/data-services/src/services/emailService';

// Test emails for development
const TEST_EMAILS = ['heredialucasfac22@gmail.com', 'nicolascaliari28@gmail.com'];

interface EmailClientsViewServerProps {
    category?: string;
    type?: string;
    dictionary: Dictionary;
    clients: ClientForTable[];
    emailTemplates: EmailTemplateData[];
}

export function EmailClientsViewServer(props: EmailClientsViewServerProps) {
    return (
        <EmailClientsViewClient
            {...props}
        />
    );
} 