import NavBar from './components/navbar';
export default function HomePage() {

  const featuredPets = [
    { id: 1, name: 'Snowflake', breed: 'Albino Budgie', age: 2, image: 'snowflake.webp' },
    { id: 2, name: 'Whiskers', breed: 'Siamese Cat', age: 1, image: 'whiskers.webp' },
    { id: 3, name: 'Buddy', breed: 'Golden Retriever', age: 3, image: 'buddy.jpg' },
  ]
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main>
        <section className="pets-featured">
          <h2>Featured Pets</h2>
          <div className="pet-grid">
            {featuredPets.map((pet) => (
              <div key={pet.id} className="pet-card">
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <p>{pet.age} years old</p>
                <button>Adopt Me</button>
              </div>
            ))}
          </div>
        </section>

        <section className="adopt">
          <h2>Why adopt?</h2><br></br>
          <p>Adopting a pet is a rewarding experience that brings joy and companionship.</p>
        </section>

        <section className="info-section">
          <div className="info-cards">
            <section className="info-card">
              <h3>Browse Pets</h3>
              <p>Search through dogs, cats, birds, and more to find your perfect match.</p>
              <button>Find All Pets</button>
            </section>

            <section className="info-card">
              <h3>Apply</h3>
              <p>Complete a quick adoption application form.</p>
              <button>Apply Now - Contact Us</button>
            </section>

            <section className="info-card">
              <h3>Take them home</h3>
              <p>Meet your new best friend!</p>
            </section>
          </div>
        </section>

        <section className="success-stories">
          <h2>Happy Tails</h2>
          <p>
            Hundreds of pets have found loving homes through our platform, and we love sharing their stories.</p>
        </section>

        <section className="ready-to-adopt">
          <h2>Ready to adopt?</h2>
          <button>View Pets Available Now</button>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Brave Paws Adoption. All rights reserved.</p>
      </footer>
    </div>
  );
}
