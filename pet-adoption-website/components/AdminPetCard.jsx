import Link from "next/link";

export default function AdminPetCard({
    pet,
    onEdit,
    onDelete
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center w-full max-w-sm">
            <img src={pet.image} alt={pet.name} className="w-full h-56 object-contain bg-white rounded-xl"/>

            <h3 className="text-xl font-bold mt-3">{pet.name}</h3>

            <p className="text-gray-600"> Breed: {pet.breed}</p>

            <p className="text-gray-500 text-sm"> Age: {pet.age} years</p>

            <Link href="/contact">
                <button className="mt-3 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">Adopt Me</button>
            </Link>

            <button onClick={() => onEdit(pet)} className="mt-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm"> Edit </button>

            <button onClick={() => onDelete(pet._id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm"> Delete (Adopted) </button>
        </div>
    );

}