import Link from "next/link";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center">
      <img src={pet.image} alt={pet.name} className="w-full h-56 object-contain rounded-xl bg-white"/>

      <h3 className="text-xl font-bold mt-3"> {pet.name} </h3>

      <p className="text-gray-600"> {pet.breed} </p>

      <p className="text-gray-500 text-sm"> {pet.age} {pet.age === 1 ? "year" : "years"} old </p>

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