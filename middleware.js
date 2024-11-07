// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = token.sub; // Assuming the user ID is in the token
  const apiUrl = `${req.nextUrl.origin}/api/get-user?userId=${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token.accessToken}` },
    });

    if (!response.ok) {
      // Redirect to /error if the API request fails
      return NextResponse.redirect(new URL('/error', req.url));
    }

    const userData = await response.json();

    // Only redirect to /unauthorized if the userId doesn't match
    if (userData && userData.userId !== userId) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware fetching user data:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
