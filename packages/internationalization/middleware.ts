import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { locales } from '.';
import languine from './languine.json';

type RequestLike = {
  headers: { entries: () => Iterable<[string, string]> };
  nextUrl: URL;
};

const getLocale = (request: RequestLike) => {
  const headers = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers }).languages();

  return match(languages, languine.locale.targets, languine.locale.source);
};

export const internationalizationMiddleware = (request: RequestLike) => {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
