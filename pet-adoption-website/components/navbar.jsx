"use client";

import Link from "next/link";

export default function NavBar() {
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

        <nav aria-label="Primary navigation">
        <ul className="flex min-w-max flex-wrap justify-center gap-4 px-2 mt-4 text-lg font-medium sm:gap-6">
          <li><Link href="/" className="hover:text-[#ff9c6b] transition">Home</Link></li>
          <li><Link href="/dashboard" className="hover:text-[#ff9c6b] transition">Adopt</Link></li>
          <li><Link href="/about" className="hover:text-[#ff9c6b] transition">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#ff9c6b] transition">Contact</Link></li>
          <li><Link href="/login" className="hover:text-[#ff9c6b] transition">Sign in</Link></li>
        </ul>
        </nav>


      </div>
    </header>
  );
}