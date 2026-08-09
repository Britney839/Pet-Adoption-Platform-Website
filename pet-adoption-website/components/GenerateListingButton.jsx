"use client";
import { useState } from "react";

export default function GenerateListingButton({ pet }) {
  const [listing, setListing] = useState(pet.listing ?? null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setSaved(false);
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
    const data = await res.json();
    setListing(data);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/pets/${pet._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing }),
    });
    if (res.ok) setSaved(true);
    setSaving(false);
  }

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Writing listing..." : "Generate AI Listing"}
      </button>

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

          <p className="italic font-medium">"{listing.adoptionPitch}"</p>
          <span className="rounded bg-blue-100 px-2 py-1 text-xs">{listing.category}</span>

          <div className="pt-2">
            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Listing to Pet"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}