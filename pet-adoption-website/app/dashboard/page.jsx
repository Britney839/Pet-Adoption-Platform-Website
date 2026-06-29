"use client";
import { useState, useEffect } from "react";
import NavBar from '../../components/navbar';
import Link from 'next/link';
import AdminPetCard from "../../components/AdminPetCard";

export default function DashboardPage() {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    breed: "",
    species: "dog",
    age: "",
    description: "",
    imageName: "",
  });

  useEffect(() => {
    async function loadPets() {
      try {
        const res = await fetch("/api/pets");
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error("Error loading pets:", err);
      }
    }

    loadPets();
  }, []);

  const handleCheckbox = (species) => {
    setSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((s) => s !== species)
        : [...prev, species]
    );
  };

  async function handleDelete(id) {
    const response = await fetch(`/api/pets/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPets((prev) => prev.filter((pet) => pet._id !== id));
    }
  }

  function handleEdit(pet) {
    const imageName = pet.image.replace(/^\//, "");
    setEditingPet(pet._id);
    setEditForm({
      name: pet.name,
      breed: pet.breed,
      species: pet.species || "dog",
      age: pet.age,
      description: pet.description,
      imageName: imageName,
    });
  }

  async function handleSaveEdit() {
    if (!editingPet) return;

    const petData = {
      name: editForm.name,
      breed: editForm.breed,
      species: editForm.species,
      age: Number(editForm.age),
      description: editForm.description,
      image: `/${editForm.imageName}`,
    };

    try {
      const response = await fetch(`/api/pets/${editingPet}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        setPets((prev) =>
          prev.map((pet) =>
            pet._id === editingPet
              ? { ...pet, ...petData }
              : pet
          )
        );
        setEditingPet(null);
        alert("Pet updated successfully!");
      } else {
        alert("Failed to update pet.");
      }
    } catch (err) {
      console.error("Error updating pet:", err);
    }
  }

  function handleCancelEdit() {
    setEditingPet(null);
    setEditForm({
      name: "",
      breed: "",
      species: "dog",
      age: "",
      description: "",
      imageName: "",
    });
  }

  const filteredPets =
    selectedSpecies.length === 0
      ? pets
      : pets.filter((pet) => selectedSpecies.includes(pet.species));

  return (
    <div className="bg-[#fcf7ee] min-h-screen">
      <header>
        <NavBar />
      </header>

      {/* filtering pet choice for dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-md h-fit">
            <h3 className="text-2xl font-bold mb-4">Filter Pets</h3>
            <section className="space-y-2">
              <h4 className="font-semibold mb-2">Species</h4>
              <label className="flex items-center gap-2"><input type="checkbox" id="dog" onChange={() => handleCheckbox('dog')} /> Dog</label>
              <label className="flex items-center gap-2"><input type="checkbox" id="cat" onChange={() => handleCheckbox('cat')} /> Cat</label>
              <label className="flex items-center gap-2"><input type="checkbox" id="bird" onChange={() => handleCheckbox('bird')} /> Bird</label>
            </section>
          </aside>

          {/* listing pets for adoption */}
          <section className="w-full lg:w-3/4">
            <div className="mb-6 text-center">

              <h2 className="text-3xl font-bold">Available Pets for Adoption</h2>
              <p className="text-gray-600">{pets.length} pets looking for a home</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {filteredPets.map((pet) => (
                <AdminPetCard
                  key={pet._id}
                  pet={pet}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Edit Modal */}
        {editingPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Edit Pet</h2>

              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />

              <input
                type="text"
                placeholder="Breed"
                value={editForm.breed}
                onChange={(e) => setEditForm({ ...editForm, breed: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />

              <select
                value={editForm.species}
                onChange={(e) => setEditForm({ ...editForm, species: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                value={editForm.age}
                onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />

              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />

              <input
                type="text"
                placeholder="Image filename (e.g. buddy.jpg)"
                value={editForm.imageName}
                onChange={(e) => setEditForm({ ...editForm, imageName: e.target.value })}
                className="w-full p-2 mb-6 border rounded-md"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="mt-12 text-center bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">Cant find the right pet for you?</h2>
          <p className="text-gray-600">New animals arrive regularly looking for their forever homes. Check back soon or {" "}<Link href="/contact" className="text-orange-500 font-semibold">contact us</Link>{" "} and we'll help you find the perfect match!</p>
        </section>
      </main>
    </div>
  );
}