import NavBar from '../components/navbar';
import Link from 'next/link';
export default function HomePage() {

  const featuredPets = [
    { id: 7, name: 'Henry', breed: 'Cavalier King Charles Spaniel', age: 1, image: 'IMG-8092.jpg' },
    { id: 8, name: 'Max', breed: 'Beagle', age: 7, image: 'IMG-8098.jpg' },
    { id: 9, name: 'Jack', breed: 'Cairne Terrier', age: 4, image: 'IMG-8094.jpg' },
  ]
  return (
    <div className="bg-[#fcf7ee] min-h-screen">
      <header>
        <NavBar />
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        <section className="pets-featured">
          <h2 className="text-3xl font-bold text-center mb-6">Featured Pets</h2>
          <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <div key={pet.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center">
                <img src={pet.image} alt={pet.name} className="w-full h-56 object-contain rounded-xl bg-white" />
                <h3 className="text-xl font-bold mt-3">{pet.name}</h3>
                <p className="text-gray-600">{pet.breed}</p>
                <p className="text-gray-500 text-sm">{pet.age} years old</p>
                <Link href="/dashboard">
                  <button className="mt-3 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">Adopt Me</button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-3">Why adopt?</h2><br></br>
          <p className="text-gray-600 max-w-2xl mx-auto">Adopting a pet is a rewarding experience that brings joy and companionship.</p>
        </section>

        <section className="info-section">
          <div  className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section  className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-xl font-bold mb-2">Browse Pets</h3>
              <p className="text-gray-600 mb-4">Search through dogs, cats, birds, and more to find your perfect match.</p>
              <Link href="/dashboard">
                <button className="bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition">Find All Pets</button>
              </Link>
            </section>

            <section  className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-xl font-bold mb-2">Apply</h3>
              <p  className="text-gray-600 mb-4">Complete a quick adoption application form.</p>
              <Link href="/contact">
                <button className="bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition">Apply Now - Contact Us</button>
              </Link>
            </section>

            <section className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-xl font-bold mb-2">Please note...</h3>
              <p className="text-gray-600">Adopting a pet is a lifelong commitment, not a temporary decision or gift. Every animal deserves a safe, loving, and permanent home. Please be prepared for the responsibility that comes with adoption.</p>
            </section>
          </div>
        </section>


        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to adopt?</h2>
          <Link href="/dashboard">
            <button  className="bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-6 py-3 rounded-lg shadow-md transition font-medium">View Pets Available Now</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
