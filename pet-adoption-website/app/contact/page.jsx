import NavBar from "../../components/navbar";

export default function ContactPage() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <section className="contact-info">
          <h2>Contact Us Today!</h2>
          <p>If you have a question about adopting, or want to know more about one of our pets, we would love to hear from you!</p>
        </section>
        <section className="contact-form-section">
          <form className  ="contact-form">
            <fieldset>
              <legend>Contact Information</legend>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
            </fieldset>
            <fieldset>
              <legend>Message</legend>
              <select id="subject" name="subject" required>
                <option value="">Select a subject</option>
                <option value="adoption">Adoption Inquiry</option>
                <option value="pet-info">Pet Information</option>
                <option value="volunteering">Volunteer Opportunities</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" placeholder="Please enter your message here!" required></textarea>
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </section>

        <section className="contact-us">
          <h2>Contact Us</h2>
          <p>Phone: (709) 437-5555</p>
          <p>Email: adopt@bravepaws.com</p>
          <p>Address: 123 Paw Lane, St. John's</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Brave Paws Adoption. All rights reserved.</p>
      </footer>
    </div>
  );
}