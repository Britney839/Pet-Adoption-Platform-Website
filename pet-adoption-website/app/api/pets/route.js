import clientPromise from "../db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("pet_adoption");

  const pets = await db.collection("pets").find({}).toArray();

  return Response.json(pets);
}