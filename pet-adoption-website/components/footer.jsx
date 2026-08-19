export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e2b99e] bg-[#f0bea2] px-6 py-8 text-center text-sm text-[#5d4639]">
      <p className="font-semibold">Brave Paws</p>
      <p className="mt-1">Helping pets find their forever homes.</p>
      <p className="mt-3 text-xs">&copy; {new Date().getFullYear()} Brave Paws Adoption Platform</p>
    </footer>
  );
}