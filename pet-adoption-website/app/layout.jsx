

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}

        <footer>
          <p>&copy; 2023 Pet Adoption Platform</p>
          <p>Helping pets find their forever homes.</p>
        </footer>
      </body>
    </html>
  );
}
