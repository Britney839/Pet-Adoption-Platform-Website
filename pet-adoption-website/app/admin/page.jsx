"use client";

import { useState } from "react";

export default function AdminPage() {
    let [name, setName] = useState("");
    let [breed, setBreed] = useState("");
    let [age, setAge] = useState("");
    let [description, setDescription] = useState("");
    let [imageName, setImageName] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        let pet = {name, breed, age, description, image: `/public/${imageName}`};
        let response = await fetch("/api/pets", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(pet)
        });
        if (response.ok) {
            alert("Pet added!");

            setName("");
            setBreed("");
            setAge("");
            setDescription("");
            setImageName("");
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Pet</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)}/>
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" placeholder="Image filename (e.g. belle.jpg)" value={imageName} onChange={(e) => setImageName(e.target.value)}/>
            <button type="submit">Add Pet</button>
        </form>
    )
}