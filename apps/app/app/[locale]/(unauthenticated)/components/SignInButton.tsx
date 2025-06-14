'use client';

import { useFormStatus } from 'react-dom';
import { Dictionary } from '@repo/internationalization';

interface SignInButtonProps {
    dictionary?: Dictionary;
}

export function SignInButton({ dictionary }: SignInButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-2 px-4 rounded-md transition-colors ${pending
                    ? 'bg-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
        >
            {pending ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {dictionary?.app?.auth?.signIn?.signing || 'Signing in...'}
                </div>
            ) : (
                dictionary?.app?.auth?.signIn?.button || 'Sign in'
            )}
        </button>
    );
} 