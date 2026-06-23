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
        <div>
            <header>
                <NavBar />
            </header>
        <form onSubmit={handleSubmit}>
            <h2>Add Pet</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Image filename (e.g. belle.jpg)" value={imageName} onChange={(e) => setImageName(e.target.value)} required />
            <label className="sr-only">Species</label>
            <select value={species} onChange={(e) => setSpecies(e.target.value)} className="mt-2 p-2 rounded-md">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
            </select>
            <button type="submit">Add Pet</button>
        </form>
        </div>
    );
}