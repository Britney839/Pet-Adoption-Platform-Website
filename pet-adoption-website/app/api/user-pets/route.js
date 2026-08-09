import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "../db";
import { getUserFromSession } from "../../../lib/auth.js";

export async function POST(request) {
  const cookieStore = await cookies();
  const user = await getUserFromSession(cookieStore);

  if (!user) {
    return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
  }

  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("pet_adoption");

  const doc = {
    userId: user._id,
    userEmail: user.email,
    userName: user.name,
    petName: body.petName,
    createdAt: new Date(),
  };

  await db.collection("user_data").insertOne(doc);

  return NextResponse.json({ success: true, data: doc });
}