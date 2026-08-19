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

                        <label htmlFor="name" className="block font-semibold">Pet name</label>
                        <input
                            id="name"
                            name="name"
                            value={newPet.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Name"
                            className="w-full border p-2"
                            required
                        />
                        <label htmlFor="breed" className="block font-semibold">Breed</label>
                        <input
                            id="breed"
                            name="breed"
                            value={newPet.breed}
                            onChange={(e) => handleChange("breed", e.target.value)}
                            placeholder="Breed"
                            className="w-full border p-2"
                            required
                        />

                        <label htmlFor="species" className="block font-semibold">Species</label>
                        <select
                            id="species"
                            name="species"
                            value={newPet.species}
                            onChange={(e) => handleChange("species", e.target.value)}
                            className="w-full border p-2"
                        >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>

                        <label htmlFor="age" className="block font-semibold">Age in years</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={newPet.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            placeholder="Age"
                            className="w-full border p-2"
                            min="0"
                            required
                        />

                        <label htmlFor="description" className="block font-semibold">Public description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newPet.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Description"
                            className="w-full border p-2"
                            required
                        />

                        <label htmlFor="intakeNotes" className="block font-semibold">Staff notes</label>
                        <textarea
                            id="intakeNotes"
                            name="intakeNotes"
                            value={newPet.intakeNotes}
                            onChange={(e) => handleChange("intakeNotes", e.target.value)}
                            placeholder="Staff notes on temperament and history"
                            className="w-full border p-2"
                            rows={4}
                            required
                        />

                        <label htmlFor="image" className="block font-semibold">Image path</label>
                        <input
                            id="image"
                            name="image"
                            value={newPet.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            placeholder="Image URL (e.g., /images/stella.jpg)"
                            className="w-full border p-2"
                            required
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
                <p className="text-center text-gray-600 mt-8 text-sm">Fields marked by the form are required.</p>
            </main>
        </div>
    );
}


