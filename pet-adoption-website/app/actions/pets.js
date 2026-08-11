"use server";
import clientPromise from "../api/db";
import { petListingSchema } from "../schemas/petListingSchema";

export async function addPet(formData){
    const name = formData.get("name");
    const breed = formData.get("breed");
    const species = formData.get("species");
    const age = formData.get("age");
    const description = formData.get("description");
    const image = formData.get("image");
    const listingRaw = formData.get("listing");

    let listing;
    if (listingRaw) {
        try {
            listing = JSON.parse(listingRaw);
            const validationResult = petListingSchema.safeParse(listing);
            if (!validationResult.success) {
                throw new Error("Invalid listing data");
            }
            listing = validationResult.data;
        } catch (error) {
            listing = undefined;
        }
    }

    const client = await clientPromise;
    const db = client.db("pet_adoption");

    const pet = {
        name,
        breed,
        species,
        age: Number(age),
        description,
        image,
    };

    if (listing) {
        pet.listing = listing;
        pet.listingGeneratedAt = new Date();
    }

    await db.collection("pets").insertOne(pet);
}