"use client";
import { addPet } from "../actions/pets";
import { useState } from "react";
import NavBar from "../../components/navbar";
import GenerateListingButton from "../../components/GenerateListingButton";

export default function AdminPage() {
    const [newPet, setNewPet] = useState({
        name: "",
        breed: "",
        species: "dog",
        age: "",
        description: "",
        image: "",
        intakeNotes: "",
    });
    const [listing, setListing] = useState(null);

    function handleChange(field, value) {
        setNewPet((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <div className="bg-[#fcf7ee] min-h-screen">
            <header>
                <NavBar />
            </header>
            <main className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-4xl font-bold mb-2 text-gray-800">Add a New Pet</h2>
                    <p className="text-gray-600 mb-8">Fill out the form below to add a new pet to the adoption platform.</p>
                    <form action={addPet} className="space-y-6">

                        <input
                            name="name"
                            value={newPet.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Name"
                            className="w-full border p-2"
                        />
                        <input
                            name="breed"
                            value={newPet.breed}
                            onChange={(e) => handleChange("breed", e.target.value)}
                            placeholder="Breed"
                            className="w-full border p-2"
                        />

                        <select
                            name="species"
                            value={newPet.species}
                            onChange={(e) => handleChange("species", e.target.value)}
                            className="w-full border p-2"
                        >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>

                        <input
                            name="age"
                            type="number"
                            value={newPet.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            placeholder="Age"
                            className="w-full border p-2"
                        />

                        <textarea
                            name="description"
                            value={newPet.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Description"
                            className="w-full border p-2"
                        />

                        <textarea
                            name="intakeNotes"
                            value={newPet.intakeNotes}
                            onChange={(e) => handleChange("intakeNotes", e.target.value)}
                            placeholder="Staff notes on temperament and history"
                            className="w-full border p-2"
                            rows={4}
                        />

                        <input
                            name="image"
                            value={newPet.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            placeholder="Image URL (e.g., /images/stella.jpg)"
                            className="w-full border p-2"
                        />

                        <input type="hidden" name="listing" value={listing ? JSON.stringify(listing) : ""} />

                        <GenerateListingButton pet={newPet} onListingGenerated={setListing} />

                        <button
                            type="submit"
                            className="w-full bg-[#ffb38a] hover:bg-[#ff9c6b] text-white font-bold py-3 rounded-lg"
                        >
                            Add Pet with Listing
                        </button>
                    </form>
                </div>
                <p className="text-center text-gray-600 mt-8 text-sm">* All fields are required</p>
            </main>
        </div>
    );
}


