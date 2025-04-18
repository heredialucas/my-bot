'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../../animations/animations';
import { Bell, Mail, Lock } from 'lucide-react';
import type { Dictionary } from '@repo/internationalization';

type NewsletterProps = {
    dictionary: Dictionary;
};

export const Newsletter = ({ dictionary }: NewsletterProps) => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [sendingNewsletter, setSendingNewsletter] = useState(false);
    const [newsletterStatus, setNewsletterStatus] = useState<{
        type: 'success' | 'error' | '';
        message: string;
    }>({ type: '', message: '' });

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!newsletterEmail || !newsletterEmail.includes('@')) {
            setNewsletterStatus({
                type: 'error',
                message: dictionary.web.home.newsletter.validation || 'Please enter a valid email'
            });
            return;
        }

        try {
            setSendingNewsletter(true);
            setNewsletterStatus({ type: '', message: '' });

            // Simulación de envío (reemplazar con la llamada a API real)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Éxito
            setNewsletterStatus({
                type: 'success',
                message: dictionary.web.home.newsletter.success || 'Thank you for subscribing!'
            });
            setNewsletterEmail('');
        } catch (error) {
            // Error
            setNewsletterStatus({
                type: 'error',
                message: dictionary.web.home.newsletter.error || 'Something went wrong. Please try again.'
            });
        } finally {
            setSendingNewsletter(false);
        }
    };

    return (
        <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 py-24 relative"
        >
            {/* Elementos decorativos modernos */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-10 top-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute right-1/3 top-1/2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute left-1/4 bottom-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse"></div>

                {/* Líneas decorativas */}
                <div className="absolute top-0 left-1/3 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Bell className="w-8 h-8" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {dictionary.web.home.newsletter.title || 'Stay Updated'}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg max-w-2xl mx-auto">
                            {dictionary.web.home.newsletter.description || 'Subscribe to receive the latest news about digital product development and MVPs'}
                        </p>
                    </div>

                    <motion.div
                        className="max-w-md mx-auto"
                        variants={{
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm">
                            <form
                                onSubmit={handleNewsletterSubmit}
                                className="flex flex-col md:flex-row gap-3"
                            >
                                <div className="flex-1 relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder={dictionary.web.home.newsletter.placeholder || 'Your email address'}
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-white/10 text-black placeholder-black/40 focus:border-blue-400/50 focus:outline-none transition-colors"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={sendingNewsletter}
                                    className="md:w-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sendingNewsletter
                                        ? (dictionary.web.home.newsletter.subscribing || 'Subscribing...')
                                        : (dictionary.web.home.newsletter.subscribe || 'Subscribe')}
                                </motion.button>
                            </form>
                        </div>

                        {/* Mensaje de estado */}
                        {newsletterStatus.type && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-4 p-3 rounded-lg text-sm ${newsletterStatus.type === "success"
                                    ? "bg-green-500/10 text-green-200"
                                    : "bg-red-500/10 text-red-200"
                                    }`}
                            >
                                {newsletterStatus.message}
                            </motion.div>
                        )}

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>{dictionary.web.home.newsletter.privacy || 'We promise not to send spam, only relevant content'}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}; 