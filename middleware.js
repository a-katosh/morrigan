// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Ensure correct import

export async function middleware(req) {
  // Get token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the user is authenticated
  if (!token) {
    console.log('No token found. Redirecting to sign-in.');
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // Call the API route to get user data from DynamoDB
  const userId = token.sub; // Assuming the user ID is in the token
  console.log(`Fetching user data for userId: ${userId}`);
  const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);

  if (!response.ok) {
    console.error('Unauthorized access attempt:', await response.text());
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Attach user's role to response headers if needed
  const userData = await response.json();
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('X-User-Role', userData.role ? userData.role.S : 'Unknown');
  return nextResponse;
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes to apply the middleware
};
