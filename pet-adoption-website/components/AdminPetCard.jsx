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

            {pet.listing && (
                <div className="mt-4 rounded-2xl border border-[#f3d7bf] bg-[#fffbf6] p-4 text-left">
                    <h4 className="text-lg font-semibold mb-2"> {pet.listing.title} </h4>

                    <p className="text-gray-700 text-sm mb-3"> {pet.listing.description} </p>

                    <div className="flex flex-wrap gap-2 mb-3">

                        {pet.listing.personalityTraits.map((trait) => (
                            <span key={trait} className="rounded-full bg-[#fde4c7] px-3 py-1 text-xs font-medium text-[#7c4a1b]" >
                                {trait}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Ideal home:</strong> {pet.listing.idealHomeType}
                    </p>

                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Category:</strong> {pet.listing.category}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {pet.listing.goodWith.map((item) => (
                            <span key={item} className="rounded-full bg-[#e7f7f1] px-2 py-1 text-xs text-[#1f5f4a]" >
                                Good with {item.replace("_", " ")}
                            </span>
                        ))}
                    </div>

                    <p className="italic text-sm text-gray-700">
                        "{pet.listing.adoptionPitch}"
                    </p>
                    
                </div>
            )}
        </div>
    );

}