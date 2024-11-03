// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Ensure correct import

export async function middleware(req) {
  // Get token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Call the API route to get user data from DynamoDB
  const userId = token.sub; // Assuming the user ID is in the token
  const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);

  // Check if user data is available
  if (!response.ok) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  const userData = await response.json();
  const role = userData.role ? userData.role.S : 'Unknown'; // Extracting the role

  // Attach user's role to response headers
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('X-User-Role', role);
  return nextResponse;
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes to apply the middleware
};
