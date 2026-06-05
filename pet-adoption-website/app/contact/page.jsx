import NavBar from "../../components/navbar";

export default function ContactPage() {
  return (
    <div className="bg-[#fcf7ee] min-h-screen">
      <header>
        <NavBar />
      </header>
      <main  className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <section  className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-3">Contact Us Today!</h2>
          <p className="text-gray-600">If you have a question about adopting, or want to know more about one of our pets, we would love to hear from you!</p>
        </section>
        <section className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-md">
          <form className="space-y-6">
            <fieldset>
              <legend className="text-xl font-bold mb-4">Contact Information</legend>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb38a]" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb38a]" required />
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb38a]" required />
            </fieldset>
            <fieldset>
              <legend className="text-xl font-bold mb-4">Message</legend>
              <select id="subject" name="subject"  className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffb38a]"required>
                <option value="">Select a subject</option>
                <option value="adoption">Adoption Inquiry</option>
                <option value="pet-info">Pet Information</option>
                <option value="volunteering">Volunteer Opportunities</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" placeholder="Please enter your message here!" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb38a]"required></textarea>
              <button type="submit" className="w-full bg-[#ffb38a] hover:bg-[#ff9c6b] text-white py-3 rounded-lg font-medium transition shadow-md">Submit</button>
            </fieldset>
          </form>
        </section>

        <section className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md">
          <h2>Contact Us</h2>
          <p className="text-gray-600">Phone: (709) 437-5555</p>
          <p className="text-gray-600">Email: adopt@bravepaws.com</p>
          <p className="text-gray-600">Address: 123 Paw Lane, St. John's</p>
        </section>
      </main>
    </div>
  );
}