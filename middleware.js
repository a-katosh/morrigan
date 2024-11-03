// middleware.js
import { getToken } from 'next-auth/jwt';
import allowedUsers from './data/allowedUsers.json';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to sign-in if no token (user is not authenticated)
  if (!token) {
    return Response.redirect(new URL('/api/auth/signin', req.url));
  }

  // Extract allowedUsers and check if current user is authorized
  const isAuthorizedUser = allowedUsers.allowedUsers.some(
    (user) => user.id === token.sub && user.clearance === 'TOPSECRET' && user.role === 'Director'
  );

  // Redirect unauthorized users to an unauthorized page
  if (req.nextUrl.pathname === '/dashboard' && !isAuthorizedUser) {
    return Response.redirect(new URL('/unauthorized', req.url));
  }

  return Response.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
