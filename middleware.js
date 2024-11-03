export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = token.sub;
  const response = await fetch(`${req.nextUrl.origin}/api/getUser?userId=${userId}`);
  
  if (!response.ok) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  const userData = await response.json();
  const role = userData.role ? userData.role.S : 'Unknown';
  
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('X-User-Role', role);
  return nextResponse;
}
