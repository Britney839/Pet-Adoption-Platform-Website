import NavBar from "../../components/navbar";

export default function AboutPage() {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main>
        <section>
          <h1>Meet Our Founders</h1>
          <div className="owner-card">
            <img src="/emily.png" alt="Emily Elliott"></img>
            <h3>Emily Elliott</h3>
          </div>

          <div className="owner-card">
            <img src="/britney.png" alt="Britney Harris"></img>
            <h3>Britney Harris</h3>
          </div>
        </section>

        <section></section>

        <section>
          <div>
            <section></section>
            <section></section>
            <section></section>
          </div>
        </section>

        <section></section>
      </main>
    </div>
  );
}