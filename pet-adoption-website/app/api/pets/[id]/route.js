import { connectToDB } from "../../db";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {

    const body = await request.json();

    const { db } = await connectToDB();

    await db.collection("pets").updateOne(
        { _id: new ObjectId(params.id) },
        {
            $set: {
                name: body.name,
                breed: body.breed,
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

export async function DELETE(request, { params }) {

    const { db } = await connectToDB();

    await db.collection("pets").deleteOne({
        _id: new ObjectId(params.id)
    });

    return Response.json({
        message: "Pet deleted"
    });
}