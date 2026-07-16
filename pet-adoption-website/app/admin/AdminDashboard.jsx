"use client";
import { addPet } from "../actions/pets";
import { useState } from "react";
import NavBar from "../../components/navbar";

export default function AdminPage() {

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

                        <input name="name" placeholder="Name" className="w-full border p-2" />
                        <input name="breed" placeholder="Breed" className="w-full border p-2" />

                        <select name="species" className="w-full border p-2">
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>

                        <input name="age" type="number" placeholder="Age" className="w-full border p-2" />

                        <textarea
                            name="description"
                            placeholder="Description"
                            className="w-full border p-2"
                        />

                        <input
                            name="image"
                            placeholder="Image URL"
                            className="w-full border p-2"
                        />

                        <button
                            type="submit"
                            className="w-full bg-[#ffb38a] hover:bg-[#ff9c6b] text-white font-bold py-3 rounded-lg"
                        >
                            Add Pet
                        </button>

                    </form>
                </div>
                <p className="text-center text-gray-600 mt-8 text-sm">* All fields are required</p>
            </main>
        </div>
    );
}


