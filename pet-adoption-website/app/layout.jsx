import "./globals.css";
import Footer from "../components/footer";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className} style={{ backgroundColor: "#f0bea2" }}>
        
        {children}

        <Footer />
      </body>
    </html>
  );
}
