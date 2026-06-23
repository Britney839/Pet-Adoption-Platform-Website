import { connectToDB } from "../db";

export async function GET() {

    const { db } = await connectToDB();

    const pets = await db.collection("pets").find().toArray();

    return Response.json(pets);
}

export async function POST(request) {

    const body = await request.json();

    const { db } = await connectToDB();

    await db.collection("pets").insertOne({
        name: body.name,
        breed: body.breed,
        age: body.age,
        description: body.description,
        image: body.image
    });

    return Response.json({
        message: "Pet added successfully"
    });
}