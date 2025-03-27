'use server';

import { env } from '@/env';
import { resend } from '@repo/email';
import { ContactTemplate } from '@repo/email/templates/contact';
import { parseError } from '@repo/observability/error';
import { createRateLimiter, slidingWindow } from '@repo/rate-limit';
import { headers } from 'next/headers';

export const contact = async (
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<{
  error?: string;
}> => {
  try {
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
      const rateLimiter = createRateLimiter({
        limiter: slidingWindow(1, '1d'),
      });
      const head = await headers();
      const ip = head.get('x-forwarded-for');

      const { success } = await rateLimiter.limit(`contact_form_${ip}`);

      if (!success) {
        throw new Error(
          'You have reached your request limit. Please try again later.'
        );
      }
    }

    if (!env.RESEND_FROM) {
      throw new Error('RESEND_FROM is not set');
    }

    // Para entorno de desarrollo, usa onboarding@resend.dev como remitente
    const fromEmail = process.env.NODE_ENV === 'development'
      ? 'onboarding@resend.dev'
      : env.RESEND_FROM;

    // Siempre enviar a la cuenta de producción de NetFull
    const toEmail = 'netfull.cuenta.produccion@gmail.com';

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'netfull.cuenta.produccion@gmail.com',
      subject: 'Nuevo contacto desde la web',
      replyTo: email,
      react: <ContactTemplate name={name} email={email} message={message} phone={phone} />,
    });

    if (error) {
      console.error('Error al enviar correo:', error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }

    console.log('Correo enviado con éxito:', data);
    return {};
  } catch (error) {
    const errorMessage = parseError(error);
    return { error: errorMessage };
  }
};
