import { connectToDB } from "../db";

export async function GET() {

    const { db } = await connectToDB();

    const pets = await db.collection("pets").find().toArray();

    return Response.json(pets);
}

export async function POST(request) {
    try {
        let body = await request.json();
        let { db } = await connectToDB();

        await db.collection("pets").insertOne({
            name: body.name,
            breed: body.breed,
            species: body.species || 'unknown',
            age: body.age,
            description: body.description,
            image: body.image
        });

        return Response.json({
            message: "Pet added successfully"
        }, { status: 200 });
    } catch (error) {
        console.error("POST /api/pets error:", error.message);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}