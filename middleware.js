import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Token:', token); // Log the token for debugging

  // Check if the user is authenticated
  if (!token) {
    console.log('No token found. Redirecting to sign-in.');
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // Call the API route to get user data from DynamoDB
  const userId = token.sub; // Assuming the user ID is in the token
  console.log(`Fetching user data for userId: ${userId}`);
  
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);

    // Log the response for debugging
    console.log('Response status:', response.status);
    const userData = await response.json();
    
    if (!response.ok) {
      console.error('Unauthorized access attempt:', userData); // Log unauthorized access message
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    // Attach user's role to response headers if needed
    const nextResponse = NextResponse.next();
    nextResponse.headers.set('X-User-Role', userData.role ? userData.role.S : 'Unknown');
    return nextResponse;

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/error', req.url)); // Redirect to an error page
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes to apply the middleware
};
