import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { usersTable, userShippingAddresses } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    // Get the userId from Clerk's auth() function
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Read the request body ONCE and store it
    const body = await req.json();
    console.log("Request body:", body);
    console.log("Clerk User ID:", userId);

    // Destructure from the stored body
    const { 
      firstName, 
      lastName, 
      streetAddress, 
      streetAddress2, 
      city, 
      state, 
      zipCode, 
      country, 
      phoneNumber 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert user into usersTable
    await db.insert(usersTable).values({
      clerkId: userId,
      firstName,
      lastName,
    }).returning();

    // Retrieve the inserted user to get the id
    const result = await db.select().from(usersTable).where(eq(usersTable.clerkId, userId));
    
    if (!result.length) {
      return NextResponse.json(
        { error: 'Failed to create user record' },
        { status: 500 }
      );
    }

    const { id: userTableId } = result[0];

    // Insert address into userShippingAddresses
    await db.insert(userShippingAddresses).values({
      userId: userTableId,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      isDefault: true,
    }).execute();

    return NextResponse.json(
      { message: 'User and address added successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}