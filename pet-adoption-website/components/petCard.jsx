import Link from "next/link";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center">
      <img src={pet.image} alt={pet.name} className="w-full h-56 object-contain rounded-xl bg-white"/>

      <h3 className="text-xl font-bold mt-3"> {pet.name} </h3>

      <p className="text-gray-600"> {pet.breed} </p>

      <p className="text-gray-500 text-sm"> {pet.age} {pet.age === 1 ? "year" : "years"} old </p>

      {pet.listing && (
        <div className="mt-4 rounded-xl border border-[#f3d7bf] bg-[#fffbf6] p-4 text-left">
          <h4 className="text-lg font-semibold text-[#5d4639]">{pet.listing.title}</h4>
          <p className="mt-2 text-sm text-gray-700">{pet.listing.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {(pet.listing.personalityTraits || []).map((trait) => (
              <span key={trait} className="rounded-full bg-[#fde4c7] px-3 py-1 text-xs font-medium text-[#7c4a1b]">
                {trait}
              </span>
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-600">
            <strong>Ideal home:</strong> {pet.listing.idealHomeType}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {(pet.listing.goodWith || []).map((item) => (
              <span key={item} className="rounded-full bg-[#e7f7f1] px-2 py-1 text-xs text-[#1f5f4a]">
                Good with {item.replace("_", " ")}
              </span>
            ))}
          </div>

          <p className="mt-3 text-sm italic text-gray-700">
            &ldquo;{pet.listing.adoptionPitch}&rdquo;
          </p>
        </div>
      )}

      {pet.adopted ? (
        <button disabled className="mt-3 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
          Adopted
        </button>
      ) : (
        <Link href="/contact" className="mt-3 inline-block bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">
          Adopt Me
        </Link>
      )}
    </div>
  );
}