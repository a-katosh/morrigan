import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);

  if (!token) {
    console.log('No token found. Redirecting to sign-in.');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = token.sub; // Assuming the user ID is in the token
  console.log(`Fetching user data for userId: ${userId}`);

  try {
    const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);
    console.log('Response status:', response.status);
    const responseBody = await response.text(); // Get response as text to log it
    console.log('Response body:', responseBody);

    if (!response.ok) {
      console.error('Error fetching user data:', responseBody);
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const userData = JSON.parse(responseBody);
    const nextResponse = NextResponse.next();
    nextResponse.headers.set('X-User-Role', userData.role ? userData.role.S : 'Unknown');
    return nextResponse;

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
