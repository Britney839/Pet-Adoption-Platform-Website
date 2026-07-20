"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getSessionUser() {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";").map((item) => item.trim());
  const sessionCookie = cookies.find((item) => item.startsWith("session="));

  if (!sessionCookie) return null;

  try {
    const value = decodeURIComponent(sessionCookie.split("=")[1]);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  return (
    <header className="bg-[#f0bea2] shadow-sm">
      <div className="w-40 h-[2px] bg-[#ffb38a] mt-4 rounded-full" />
      <div className="flex flex-col items-center py-6">
        <div className="flex justify-center">
          <img
            src="/banner.png"
            alt="Banner Logo"
            className="w-full h-[260px] object-cover rounded-2xl shadow-md"
          />
        </div>

        <ul className="flex gap-6 mt-4 text-lg font-medium">
          <li><Link href="/" className="hover:text-[#ff9c6b] transition">Home</Link></li>
          <li><Link href="/dashboard" className="hover:text-[#ff9c6b] transition">Adopt</Link></li>
          <li><Link href="/about" className="hover:text-[#ff9c6b] transition">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#ff9c6b] transition">Contact</Link></li>
        </ul>


      </div>
    </header>
  );
}