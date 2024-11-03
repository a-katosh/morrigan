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
    const response = await fetch(`https://23.22.198.16:4000/api/user/${userId}`);
    console.log('Response status from external API:', response.status);

    if (!response.ok) {
      // Handle different status codes accordingly
      if (response.status === 403) {
        console.error('Forbidden: User does not have access');
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
      console.error('Error fetching user data, status code:', response.status);
      return NextResponse.redirect(new URL('/error', req.url));
    }

    const userData = await response.json();
    console.log('User data retrieved:', userData);
    if (userData && userData.userId === userId) {
      const nextResponse = NextResponse.next();
      nextResponse.headers.set('X-User-Role', userData.role || ''); // Set user role if applicable
      return nextResponse;
    } else {
      console.error('User not found:', userData);
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
