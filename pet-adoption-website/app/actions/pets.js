"use server";
import clientPromise from "../api/db";

export async function addPet(formData){
    const name = formData.get("name");
    const breed = formData.get("breed");
    const species = formData.get("species");
    const age = formData.get("age");
    const description = formData.get("description");
    const image = formData.get("image");

    const client = await clientPromise;
    const db = client.db("pet_adoption");

    await db.collection("pets").insertOne({
        name,
        breed,
        species,
        age: Number(age),
        description,
        image,
    });
}