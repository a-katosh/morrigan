// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

// Initialize DynamoDB Client
const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT, // Optional if using a local DynamoDB
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  try {
    // Set up parameters to get user data from DynamoDB
    const params = {
      TableName: 'AllowedUsers',
      Key: {
        id: { S: token.sub }, // The user ID as a string attribute
      },
    };

    // Run the GetItemCommand to retrieve user information
    const { Item } = await dynamoDbClient.send(new GetItemCommand(params));

    // Redirect if user is not found in the AllowedUsers table
    if (!Item) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Attach user's role to response headers
    const role = Item.role ? Item.role.S : 'Unknown'; // DynamoDB stores attributes in specific types
    const response = NextResponse.next();
    response.headers.set('X-User-Role', role);
    return response;
  } catch (error) {
    console.error('Error fetching from DynamoDB:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
