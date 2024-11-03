// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'; // Import NextResponse
import allowedUsers from './data/allowedUsers.json';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to sign-in if no token (user is not authenticated)
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)); // Use NextResponse
  }

  // Check if the user is in the list of allowed users
  const isAuthorizedUser = allowedUsers.allowedUsers.some(
    (user) => user.id === token.sub && user.clearance === 'TOPSECRET' && user.role === 'Director'
  );

  // Redirect unauthorized users to an unauthorized page
  if (req.nextUrl.pathname === '/dashboard' && !isAuthorizedUser) {
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Use NextResponse
  }

  return NextResponse.next(); // Use NextResponse here
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
