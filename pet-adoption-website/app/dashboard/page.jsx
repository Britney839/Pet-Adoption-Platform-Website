import NavBar from '../../components/navbar';
import Link from 'next/link';

export default function DashboardPage() {
  const pets = [
    { id: 1, name: 'Snowflake', breed: 'Albino Budgie', age: 2, image: 'snowflake.webp' },
    { id: 2, name: 'Whiskers', breed: 'Siamese Cat', age: 1, image: 'whiskers.webp' },
    { id: 3, name: 'Buddy', breed: 'Golden Retriever', age: 3, image: 'buddy.jpg' },
    { id: 4, name: 'Nala', breed: 'Great Dane', age: 7, image: 'IMG-8099.jpg' },
    { id: 5, name: 'Charlie', breed: 'Doberman', age: 5, image: 'IMG-8100.jpg' },
    { id: 6, name: 'Cooper', breed: 'Havanese', age: 5, image: 'IMG-8096.jpg' },
    { id: 7, name: 'Henry', breed: 'Cavalier King Charles Spaniel', age: 1, image: 'IMG-8092.jpg' },
    { id: 8, name: 'Max', breed: 'Beagle', age: 7, image: 'IMG-8098.jpg' },
    { id: 9, name: 'Jack', breed: 'Cairne Terrier', age: 4, image: 'IMG-8094.jpg' },
    { id: 10, name: 'Oreo', breed: 'Shih tzu', age: 2, image: 'IMG-8097.jpg' },
  ];
  return (
    <div>
      <header>
        <NavBar />
      </header>

      {/* filtering pet choice for dashboard */}
      <main className="dashboard-main">
        <aside className='dashboard-sidebar'></aside>
        <h3>Filter Pets</h3>
        <section className="filter-group">
          <h4>Species</h4>
          <label><input type="checkbox" id="dog" /> Dog</label>
          <label><input type="checkbox" id="cat" /> Cat</label>
          <label><input type="checkbox" id="bird" /> Bird</label>
        </section>
        <button className="filter-button">Apply Filter</button>

        {/* listing pets for adoption */}
        <section className="dashboard-header">
          <div>
            <section className="pet-list">
              <h2>Available Pets for Adoption</h2>
              <p>{pets.length} pets looking for a home</p>
            </section>
            <section className="pets">
              {pets.map((pet) => (
                <div key={pet.id} className="pet-card">
                  <img src={pet.image} alt={pet.name} className="pet-image" />
                  <h3>{pet.name}</h3>
                  <p>Breed: {pet.breed}</p>
                  <p>Age: {pet.age} years</p>
                  <Link href="/contact">
                    <button className="adopt-button">Adopt Me</button>
                  </Link>
                </div>
              ))}
            </section>
          </div>
        </section>

        <section>
          <h2>Cant find the right pet for you?</h2>
          <p>New animals arrive regularly looking for their forever homes. Check back soon or {" "}<Link href="/contact">contact us</Link>{" "} and we'll help you find the perfect match!</p>
        </section>
      </main>
    </div>
  );
}