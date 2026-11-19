
import { useState } from "react";
import { submitContactMessage } from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, phone, message } = formData;

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus({
        message: "Please complete all fields.",
        type: "error",
      });
      return;
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");

    if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
      setStatus({
        message: "Please enter a valid phone number.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({
        message: "Sending message...",
        type: "loading",
      });

      await submitContactMessage({
        name: name.trim(),
        phone: cleanPhone,
        message: message.trim(),
      });

      setStatus({
        message: "Your message has been submitted successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        message: error.message || "Unable to submit your message.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-heading">
        <span>GET IN TOUCH</span>
        <h2>Let's Work Together</h2>
        <p>
          Have a project, opportunity or question?
          I'd love to hear from you.
        </p>
      </div>

      <div className="contact-grid">

        {/* CONTACT INFORMATION */}
        <div className="contact-info">
          <h3>Let's Connect</h3>

          <p>
            I'm open to opportunities in Full Stack Development,
            AWS Cloud and DevOps Engineering.
          </p>

          <a href="mailto:dhanarajkshirsagar35@gmail.com">
            ✉️ Email
            <span>dhanarajkshirsagar35@gmail.com</span>
          </a>

          <a href="tel:+917057965479">
            📞 Phone
            <span>+91 70579 65479</span>
          </a>

          <a
            href="https://github.com/Dhanrajdk79"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 GitHub
            <span>View my repositories</span>
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 LinkedIn
            <span>Connect professionally</span>
          </a>
        </div>

        {/* CONTACT FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <h3>Send Me a Message</h3>

          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            required
          />

          <label htmlFor="contact-phone">Phone Number</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-message">Your Message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Write your message..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            maxLength={2000}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message →"}
          </button>

          {status.message && (
            <p
              className={`form-feedback ${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          )}
        </form>

      </div>
    </section>
  );
}

export default Contact;
