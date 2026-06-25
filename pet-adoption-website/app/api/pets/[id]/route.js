import clientPromise from "../../db";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {

    const body = await request.json();

       const client = await clientPromise;
   const db = client.db("pet_adoption");

    await db.collection("pets").updateOne(
        { _id: new ObjectId(params.id) },
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


export async function DELETE(request, { params }) {

    const client = await clientPromise;
    const db = client.db("pet_adoption");

    await db.collection("pets").deleteOne({
        _id: new ObjectId(params.id)
    });

    return Response.json({
        message: "Pet deleted"
    });
}