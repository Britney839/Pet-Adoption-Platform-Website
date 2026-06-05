"use client";

import NavBar from "../../components/navbar";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [dogImg, setDogImg] = useState("");

  async function getDogImage() {
    try {
      const response = await fetch("/api");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDogImg(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error.message);
    }
  }

  useEffect(() => {
    getDogImage();
  }, []);

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

        <section>
          <h2>Success Stories</h2>

          <p>Explore a collection of happy pets that reflect the adoption success stories at the heart of our mission.</p>

          {dogImg && (
            <img src={dogImg} alt="dog" width={300}/>
          )}
          <div>
            <button onClick={getDogImage}>Show Another Happy Pet</button>
          </div>
        </section>
      </main>
    </div>
  );
}