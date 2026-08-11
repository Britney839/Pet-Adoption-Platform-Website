import clientPromise from "../../db";
import { ObjectId } from "mongodb";

export async function PUT(request, context) {
    const { id } = await context.params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("pet_adoption");

    await db.collection("pets").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                name: body.name,
                breed: body.breed,
                species: body.species,
                age: body.age,
                description: body.description,
                image: body.image
            }
        }
    );

    return Response.json({
        message: "Pet updated"
    });
}




export async function DELETE(request, context) {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("pet_adoption");

    const result = await db.collection("pets").deleteOne({
        _id: new ObjectId(id)
    });

    return Response.json({
        message: "Pet deleted",
        deletedCount: result.deletedCount
    });
}

export async function PATCH(request, context) {
    const { id } = await context.params;
    const body = await request.json();

    if (!body.listing) {
        return Response.json({ error: "Missing listing data" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pet_adoption");

    const result = await db.collection("pets").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                listing: body.listing,
                listingGeneratedAt: new Date()
            }
        }
    );

    if (result.matchedCount === 0) {
        return Response.json({ error: "Pet not found" }, { status: 404 });
    }

    return Response.json({
        message: "Listing saved"
    });
}