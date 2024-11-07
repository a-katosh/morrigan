import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = token.sub;
  
  try {
    const response = await fetch(`https://23.22.198.16:4000/api/user/${userId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token.accessToken}` },
      agent: new https.Agent({ rejectUnauthorized: false }), // Disable SSL verification only for testing
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const userData = await response.json();
    
    if (userData && userData.userId === userId) {
      return NextResponse.next();
    } else {
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
