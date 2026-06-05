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
    <div className="bg-[#fcf7ee] min-h-screen">
      <header>
        <NavBar />
      </header>

      <main  className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        <section className="text-center">
          <h1 className="text-3xl font-bold mb-8">Meet Our Founders</h1>
          <div className="flex justify-center items-center gap-16 flex-nowrap overflow-x-auto">
          <div  className="text-center shrink-0">
            <img src="/emily.png" alt="Emily Elliott" className="w-64 h-64 rounded-full object-cover shadow-md"></img>
            <h3 className="text-xl font-bold mt-4">Emily Elliott</h3>
          </div>

          <div className="text-center shrink-0">
            <img src="/britney.png" alt="Britney Harris" className="w-64 h-64 rounded-full object-cover shadow-md"></img>
            <h3 className="text-xl font-bold mt-4">Britney Harris</h3>
          </div>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md text-center space-y-6">
          <h2 className="text-2xl font-bold">Success Stories</h2>

          <p className="text-gray-600 max-w-2xl mx-auto">Explore a collection of happy pets that reflect the adoption success stories at the heart of our mission.</p>
          <div className="bg-white rounded-2xl p-6 shadow-md max-w-md mx-auto">
          {dogImg && (
            <img src={dogImg} alt="dog" width={300} className="w-full h-64 object-contain rounded-xl"/>
          )}
            <button onClick={getDogImage} className="mt-4 bg-[#ffb38a] hover:bg-[#ff9c6b] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">Show Another Happy Pet</button>
          </div>
        </section>
      </main>
    </div>
  );
}