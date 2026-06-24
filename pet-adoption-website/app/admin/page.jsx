"use client";

import { useState } from "react";
import NavBar from "../../components/navbar";

export default function AdminPage() {
    let [name, setName] = useState("");
    let [breed, setBreed] = useState("");
    let [age, setAge] = useState("");
    let [description, setDescription] = useState("");
    let [imageName, setImageName] = useState("");
    let [species, setSpecies] = useState("dog");

    async function handleSubmit(event) {
        event.preventDefault();
        let pet = { name, breed, species, age: Number(age), description, image: `/${imageName}` };
       
        try {
            let response = await fetch("/api/pets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pet)
            });

            if (response.ok) {
                alert("Pet added!");

                setName("");
                setBreed("");
                setAge("");
                setDescription("");
                setImageName("");
                setSpecies("dog");
            } else {
                alert("Failed to add pet.");
            }

        } catch (error) {
            console.error("Error adding pet:" , error);
        }
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
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pet Name *</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Max, Bella, Tweety" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Breed *</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Golden Retriever, Siamese" 
                                value={breed} 
                                onChange={(e) => setBreed(e.target.value)} 
                                required
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Age (years) *</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 3" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Species *</label>
                                <select 
                                    value={species} 
                                    onChange={(e) => setSpecies(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition"
                                >
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                            <textarea 
                                placeholder="Describe the pet's personality, temperament, and other details..." 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                required
                                rows="4"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image Filename *</label>
                            <input 
                                type="text" 
                                placeholder="e.g. buddy.jpg (must be in the public folder)" 
                                value={imageName} 
                                onChange={(e) => setImageName(e.target.value)} 
                                required
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ffb38a] transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">Make sure the image file exists in the public folder</p>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                className="w-full bg-[#ffb38a] hover:bg-[#ff9c6b] text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg">Add Pet to Platform
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-gray-600 mt-8 text-sm">* All fields are required</p>
            </main>
        </div>
    );
}