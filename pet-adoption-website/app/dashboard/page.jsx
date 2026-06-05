"use client";
import { useState } from "react";
import NavBar from '../../components/navbar';
import Link from 'next/link';

export default function DashboardPage() {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const pets = [
    { id: 1, name: 'Snowflake', breed: 'Albino Budgie', age: 2, image: 'snowflake.webp', species: 'bird' },
    { id: 2, name: 'Whiskers', breed: 'Siamese Cat', age: 1, image: 'whiskers.webp', species: 'cat' },
    { id: 3, name: 'Buddy', breed: 'Golden Retriever', age: 3, image: 'buddy.jpg', species: 'dog' },
    { id: 4, name: 'Nala', breed: 'Great Dane', age: 7, image: 'IMG-8099.jpg', species: 'dog' },
    { id: 5, name: 'Charlie', breed: 'Doberman', age: 5, image: 'IMG-8100.jpg', species: 'dog' },
    { id: 6, name: 'Cooper', breed: 'Havanese', age: 5, image: 'IMG-8096.jpg', species: 'dog' },
    { id: 7, name: 'Henry', breed: 'Cavalier King Charles Spaniel', age: 1, image: 'IMG-8092.jpg', species: 'dog' },
    { id: 8, name: 'Max', breed: 'Beagle', age: 7, image: 'IMG-8098.jpg', species: 'dog' },
    { id: 9, name: 'Jack', breed: 'Cairne Terrier', age: 4, image: 'IMG-8094.jpg', species: 'dog' },
    { id: 10, name: 'Oreo', breed: 'Shih tzu', age: 2, image: 'IMG-8097.jpg', species: 'dog' },
  ];

  const handleCheckbox = (species) => {
  setSelectedSpecies((prev) =>
    prev.includes(species)
      ? prev.filter((s) => s !== species)
      : [...prev, species]
  );
};

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
        <section  className="space-y-2">
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
              <p  className="text-gray-600">{pets.length} pets looking for a home</p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {filteredPets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center w-full max-w-sm">
                  <img src={pet.image} alt={pet.name}  className="w-full h-56 object-contain bg-white rounded-xl" />
                  <h3 className="text-xl font-bold mt-3">{pet.name}</h3>
                  <p className="text-gray-600">Breed: {pet.breed}</p>
                  <p className="text-gray-500 text-sm">Age: {pet.age} years</p>
                  <Link href="/contact">
                    <button className="mt-3 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">Adopt Me</button>
                  </Link>
                </div>
              ))}
          </div>
        </section>
        </div>
        

        <section className="mt-12 text-center bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">Cant find the right pet for you?</h2>
          <p className="text-gray-600">New animals arrive regularly looking for their forever homes. Check back soon or {" "}<Link href="/contact" className="text-orange-500 font-semibold">contact us</Link>{" "} and we'll help you find the perfect match!</p>
        </section>
      </main>
    </div>
  );
}