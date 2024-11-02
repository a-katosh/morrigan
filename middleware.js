import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  if (subdomain === 'italia') {
    url.pathname = `/subdomains/italia${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (subdomain === 'un') {
    url.pathname = `/subdomains/un${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default response for root domain
  return NextResponse.next();
}
