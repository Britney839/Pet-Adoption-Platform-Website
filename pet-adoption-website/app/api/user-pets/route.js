import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "../db";

export async function POST(request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
  }

  const user = JSON.parse(sessionCookie.value);
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("pet_adoption");

  const doc = {
    userEmail: user.email,
    userName: user.name,
    petName: body.petName,
    createdAt: new Date()
  };

  await db.collection("user_data").insertOne(doc);

  return NextResponse.json({ success: true, data: doc });
}