"use client";
import { useState } from "react";

export default function GenerateListingButton({ pet, onListingGenerated }) {
  const [listing, setListing] = useState(() => pet?.listing ?? null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isExistingPet = Boolean(pet?._id);
  const canGenerate = Boolean(
    pet?.name && pet?.breed && pet?.species && pet?.age !== "" && pet?.intakeNotes
  );

  async function handleGenerate() {
    setLoading(true);
    setSaved(false);
    setErrorMessage("");
    try {
      const res = await fetch("/api/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          age: pet.age,
          intakeNotes: pet.intakeNotes,
        }),
      });
      if (!res.ok) throw new Error("Listing generation failed");
      const data = await res.json();
      setListing(data);
      if (onListingGenerated) onListingGenerated(data);
    } catch {
      setErrorMessage("We could not generate a listing. Please check the pet details and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!isExistingPet) {
      console.error("Cannot save listing: pet._id is missing");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    try {
      const res = await fetch(`/api/pets/${pet._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
      });
      if (!res.ok) throw new Error("Listing save failed");
      setSaved(true);
    } catch {
      setErrorMessage("We could not save this listing. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleGenerate} disabled={loading || !canGenerate}>
        {loading ? "Writing listing..." : "Generate AI Listing"}
      </button>

      {errorMessage && <p role="alert" className="mt-2 text-sm text-red-700">{errorMessage}</p>}

      {!canGenerate && (
        <p className="text-sm text-gray-500 mt-2">
          Fill in all pet fields and staff notes before generating a listing.
        </p>
      )}

      {listing && (
        <div className="mt-4 rounded-lg border p-4 space-y-2">
          <h3 className="text-xl font-bold">{listing.title}</h3>
          <p>{listing.description}</p>

          <div className="flex flex-wrap gap-2">
            {listing.personalityTraits.map((trait) => (
              <span key={trait} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {trait}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600">Ideal home: {listing.idealHomeType}</p>

          <div className="flex gap-2">
            {listing.goodWith.map((g) => (
              <span key={g} className="rounded bg-green-100 px-2 py-1 text-xs">
                Good with {g.replace("_", " ")}
              </span>
            ))}
          </div>

          <p className="italic font-medium">“{listing.adoptionPitch}”</p>
          <span className="rounded bg-blue-100 px-2 py-1 text-xs">{listing.category}</span>

          {isExistingPet ? (
            <div className="pt-2">
              <button type="button" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : saved ? "Saved ✓" : "Save Listing to Pet"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              This listing will be saved when you submit the new pet form.
            </p>
          )}
        </div>
      )}
    </div>
  );
}