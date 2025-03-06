import { env } from '@/env';
import { Status } from '@repo/observability/status';
import Link from 'next/link';

const DummyLegalLinks = () => {
  const links = [
    { _slug: 'privacy', _title: 'Política de Privacidad' },
    { _slug: 'terms', _title: 'Términos y Condiciones' }
  ];

  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <Link
          key={link._slug}
          href={`/legal/${link._slug}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          {link._title}
        </Link>
      ))}
    </div>
  );
};

export const Footer = () => (
  <footer className="border-t py-6 md:py-0">
    <div className="container flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <Status />
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a
            href={env.NEXT_PUBLIC_WEB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            company
          </a>
          . The source code is available on{' '}
          <a
            href={env.NEXT_PUBLIC_APP_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <DummyLegalLinks />
    </div>
  </footer>
);
