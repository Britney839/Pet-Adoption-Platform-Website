"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminPetCard from "./AdminPetCard";
import GenerateListingButton from "./GenerateListingButton";

export default function DashboardContent() {
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
    intakeNotes: "",
  });
  const [editListing, setEditListing] = useState(null);

  const [showMatcher, setShowMatcher] = useState(false);

  const [matchAnswers, setMatchAnswers] = useState({
    activityLevel: "",
    homeType: "",
    hasChildren: "",
    hasOtherPets: "",
    experience: "",
  });

  const [recommendedPets, setRecommendedPets] = useState([]);

  useEffect(() => {
    async function loadPets() {
      try {
        const res = await fetch("/api/pets", {
          cache: "no-store",
        });
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error("Error loading pets:", err);
      }
    }

    loadPets();
  }, []);

  useEffect(() => {
    document.body.style.overflow = editingPet ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [editingPet]);

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
    const imageName = pet.image ? pet.image.replace(/^\//, "") : "";
    setEditingPet(pet._id);
    setEditListing(pet.listing ?? null);
    setEditForm({
      name: pet.name,
      breed: pet.breed,
      species: pet.species || "dog",
      age: pet.age,
      description: pet.description,
      imageName: imageName,
      intakeNotes: pet.intakeNotes || "",
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
      intakeNotes: editForm.intakeNotes,
      ...(editListing ? { listing: editListing } : {}),
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
            pet._id === editingPet ? { ...pet, ...petData } : pet
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
    setEditListing(null);
    setEditForm({
      name: "",
      breed: "",
      species: "dog",
      age: "",
      description: "",
      imageName: "",
      intakeNotes: "",
    });
  }

  async function saveExample() {
    try {
      const res = await fetch("/api/user-pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petName: "Milo" }),
      });

      const data = await res.json();
      alert(data.success ? "Saved for your account" : data.error);
    } catch (err) {
      console.error("Error saving user pet:", err);
      alert("Could not save your pet right now.");
    }
  }

  function calculateMatchScore(pet) {
    let score = 0;

    const listing = pet.listing || {};
    const goodWith = listing.goodWith || [];
    const traits = listing.personalityTraits || [];
    const idealHome = (listing.idealHomeType || "").toLowerCase();
    const category = (listing.category || "").toLowerCase();


    // children
    if (matchAnswers.hasChildren == "yes") {
      if (
        goodWith.some((item) => item.toLowerCase().includes("kid")
        )
      ) {
        score += 3
      }
    } else {
      score += 1
    }
    // other pets
    if (matchAnswers.hasOtherPets == "yes") {
      if (goodWith.some((item) => ["dogs", "cats", "pets", "animals"].some((word) => item.toLowerCase().includes(word)))) {
        score += 3
      }
    } else {
      score += 1
    }


    //home type
    if (matchAnswers.homeType == "apartment") {
      if (
        idealHome.includes("apartment") || idealHome.includes("small") || idealHome.includes("low")) {
        score += 3
      }

    }

    if (matchAnswers.homeType == "house") {
      if (
        idealHome.includes("house") || idealHome.includes("home")
      ) {
        score += 2
      }
    }

    if (matchAnswers.homeType == "houseWithYard") {
      if (
        idealHome.includes("yard") || idealHome.includes("outdoor") || idealHome.includes("active")
      ) {
        score += 3
      }
    }

    //activity lvl
    if (matchAnswers.activityLevel == "low") {
      if (
        traits.some((trait) => ["calm", "gentle", "relaxed", "quiet"].some((word) => trait.toLowerCase().includes(word))) || category.includes("low")
      ) {
        score += 3
      }
    }

    if (matchAnswers.activityLevel == "medium") {
      if (
        traits.some((trait) => ["friendly", "playful", "social"].some((word) => trait.toLowerCase().includes(word)))
      ) {
        score += 3
      }
    }

    if (matchAnswers.activityLevel == "high") {
      if (
        traits.some((trait) => ["active", "energetic", "playful", "adventurous"].some((word) => trait.toLowerCase().includes(word)))
      ) {
        score += 3
      }
    }

    //XP
    if (matchAnswers.experience == "yes") {
      score += 3
    }

    if (matchAnswers.experience == "no") {
      score += 2
    }

    return score;

  }

  function getMatchReasons(pet) {
    const reasons = [];
    const listing = pet.listing || {};
    const goodWith = listing.goodWith || [];
    const traits = listing.personalityTraits || [];
    const idealHome = (listing.idealHomeType || "").toLowerCase();
    const category = (listing.category || "").toLowerCase();

    if (matchAnswers.hasChildren == "yes" && goodWith.some((item) => item.toLowerCase().includes("kid"))) {
      reasons.push("is a good fit for homes with children");
    }

    if (matchAnswers.hasOtherPets == "yes" && goodWith.some((item) => ["dogs", "cats", "pets", "animals"].some((word) => item.toLowerCase().includes(word)))) {
      reasons.push("is comfortable inhomes with other pets");
    }

    if (matchAnswers.homeType == "apartment" && (idealHome.includes("apartment") || idealHome.includes("small") || idealHome.includes("low"))) {
      reasons.push("could suit an apartment lifestyle");
    }

    if (matchAnswers.homeType == "house" && (idealHome.includes("house") || idealHome.includes("home"))) {
      reasons.push("would love a home environment");
    }

    if (matchAnswers.homeType == "houseWithYard" && (idealHome.includes("yard") || idealHome.includes("outdoor") || idealHome.includes("active"))) {
      reasons.push("could thrive in a home with a yard");
    }

    if (matchAnswers.activityLevel == "low" && traits.some((trait) => ["calm", "gentle", "relaxed", "quiet"].some((word) => trait.toLowerCase().includes(word))) || category.includes("low")) {
      reasons.push("has personality traits that match your low activity level");
    }

    if (matchAnswers.activityLevel == "medium" && traits.some((trait) => ["friendly", "playful", "social"].some((word) => trait.toLowerCase().includes(word)))) {
      reasons.push("has a friendly and playful personality that match your medium activity level");
    }

    if (matchAnswers.activityLevel == "high" && traits.some((trait) => ["active", "energetic", "playful", "adventurous"].some((word) => trait.toLowerCase().includes(word)))) {
      reasons.push("has a high activity level that matches your lifestyle");
    }

    if (matchAnswers.experience == "yes") {
      reasons.push("is suitable for experienced pet owners");
    }

    if (matchAnswers.experience == "no") {
      reasons.push("is suitable for first-time pet owners");
    }

    return reasons;
  }

  function getMatchPercentage(score) {
    const maxScore = 15;
    return Math.round((score / maxScore) * 100);
  }


  function handleFindMatches() {
    const unanswered = Object.values(matchAnswers).some((answer) => answer == "")

    if (unanswered) {
      alert("Please answer all questions")
      return;
    }

    const scoredPets = pets.map((pet) => ({ ...pet, matchScore: calculateMatchScore(pet), })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)

    setRecommendedPets(scoredPets)
  }

  const filteredPets =
    selectedSpecies.length === 0
      ? pets
      : pets.filter((pet) => selectedSpecies.includes(pet.species));

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-md h-fit">
          <h3 className="text-2xl font-bold mb-4">Filter Pets</h3>
          <section className="space-y-2">
            <h4 className="font-semibold mb-2">Species</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="dog" onChange={() => handleCheckbox("dog")} /> Dog
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="cat" onChange={() => handleCheckbox("cat")} /> Cat
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="bird" onChange={() => handleCheckbox("bird")} /> Bird
            </label>

            <button
              onClick={() => setShowMatcher(!showMatcher)}
              className="mt-4 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-full transition font-medium"
            >
              Find My Pet Match
            </button>
            {showMatcher && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold mb-2" >Find Your Perfect Pet</h4>

                <p>Answer a few questions to find your ideal companion!</p>

                <div>
                  <label>
                    How active is your lifestyle?
                  </label>
                  <select
                    value={matchAnswers.activityLevel}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, activityLevel: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select activity level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                </div>
                <div>
                  <label>
                    What type of home do you have?
                  </label>
                  <select
                    value={matchAnswers.homeType}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, homeType: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select home type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="houseWithYard">House with a yard</option>
                  </select>
                </div>
                <div>
                  <label>
                    Do you have children?
                  </label>
                  <select
                    value={matchAnswers.hasChildren}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, hasChildren: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label>
                    Do you have other pets?
                  </label>
                  <select
                    value={matchAnswers.hasOtherPets}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, hasOtherPets: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label>
                    Do you have experience with pets?
                  </label>
                  <select
                    value={matchAnswers.experience}
                    onChange={(e) => setMatchAnswers({ ...matchAnswers, experience: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <button onClick={handleFindMatches} className="mt-4 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-full transition font-medium">
                  Find My Match
                </button>
                {recommendedPets.length > 0 && (
                  <div className="mt-6">
                    {recommendedPets.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4 text-center">
                          Your Pet Matches
                        </h3>


                        <div className="bg-[#fff7f2] border-2 border-[#ffb38a] rounded-2xl p-5 mb-5 shadow-sm">
                          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                            Best Match
                          </p>

                          <h4 className="text-2xl font-bold mt-1">
                            {recommendedPets[0].name}
                          </h4>

                          <p className="text-gray-600">
                            {recommendedPets[0].breed} • {recommendedPets[0].age} years old
                          </p>

                          <div className="mt-4">
                            <p className="font-bold text-lg">
                              {getMatchPercentage(recommendedPets[0].matchScore)}% Match
                            </p>

                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                              <div
                                className="bg-[#ff9c6b] h-3 rounded-full"
                                style={{
                                  width: `${getMatchPercentage(
                                    recommendedPets[0].matchScore
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="mt-4 text-gray-700">
                            <p className="font-semibold mb-2">
                              Why {recommendedPets[0].name} may be a great match:
                            </p>

                            <ul className="list-disc pl-5 space-y-1">
                              {getMatchReasons(recommendedPets[0]).map((reason, index) => (
                                <li key={index}>
                                  {recommendedPets[0].name} {reason}.
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>


                        <h4 className="font-bold text-lg mb-3">
                          Other Great Matches
                        </h4>

                        {recommendedPets.slice(1).map((pet, index) => (
                          <div
                            key={pet._id}
                            className="border rounded-xl p-4 mb-3 bg-white"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold">
                                  #{index + 2} {pet.name}
                                </p>

                                <p className="text-gray-600">
                                  {pet.breed} - {pet.age} years old
                                </p>
                              </div>

                              <p className="font-bold text-orange-500">
                                {getMatchPercentage(pet.matchScore)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </aside>

        <section className="w-full lg:w-3/4">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Available Pets for Adoption</h2>
            <p className="text-gray-600">{pets.length} pets looking for a home</p>

            <button
              onClick={saveExample}
              className="mt-4 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-full transition font-medium"
            >
              Save pet for my account
            </button>
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

      {editingPet && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto my-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
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
              className="w-full p-2 mb-4 border rounded-md"
            />

            <textarea
              placeholder="Staff notes"
              value={editForm.intakeNotes}
              onChange={(e) => setEditForm({ ...editForm, intakeNotes: e.target.value })}
              className="w-full p-2 mb-4 border rounded-md"
              rows={4}
            />

            <GenerateListingButton
              pet={{
                ...editForm,
                _id: editingPet,
                intakeNotes: editForm.intakeNotes,
                listing: editListing,
              }}
              onListingGenerated={setEditListing}
            />

            <div className="flex gap-4 mt-6">
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
        <p className="text-gray-600">
          New animals arrive regularly looking for their forever homes. Check back soon or{" "}
          <Link href="/contact" className="text-orange-500 font-semibold">
            contact us
          </Link>{" "}
          and we&apos;ll help you find the perfect match!
        </p>
      </section>
    </main>
  );
}
