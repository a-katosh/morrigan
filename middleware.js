import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Token:', token); // Log the token for debugging

  // Check if the user is authenticated
  if (!token) {
    console.log('No token found. Redirecting to sign-in.');
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // User ID is assumed to be in the token (sub)
  const userId = token.sub; 
  console.log(`Fetching user data for userId: ${userId}`);
  
  try {
    // Fetch user data from the API
    const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);

    // Log the response for debugging
    console.log('Response status:', response.status);
    
    // If response is not OK, throw an error to handle unauthorized access
    if (!response.ok) {
      const userData = await response.json();
      console.error('Unauthorized access attempt:', userData); // Log unauthorized access message
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Parse user data if the response is OK
    const userData = await response.json();
    console.log('User Data:', userData); // Log the user data for debugging

    // Attach user's role to response headers if needed
    const nextResponse = NextResponse.next();
    nextResponse.headers.set('X-User-Role', userData.role ? userData.role.S : 'Unknown');
    return nextResponse;

  } catch (error) {
    // Handle errors during the fetch operation
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/error', req.url)); // Redirect to an error page
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes to apply the middleware
};
