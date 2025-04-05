import React from "react";
import "../Styles/ContactUs.css";
import Navbar from "./Navbar";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-left">
            <form className="glass-form">
              <div className="input-group">
                <i className="bi bi-person-fill input-icon-left"></i>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className="input-group">
                <i className="bi bi-envelope-fill input-icon-left"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="input-group">
                <i className="bi bi-chat-dots-fill input-icon-left"></i>
                <input type="text" id="subject" placeholder="Subject" />
              </div>
              <div className="input-group">
                <i className="bi bi-pencil-fill input-icon-left"></i>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-glass">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-right">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a question about
              features, pricing, or anything else—our team is ready to help.
            </p>
            <ul>
              <li>
                <i className="bi bi-envelope-fill"></i> help@ebookverse.com
              </li>
              <li>
                <i className="bi bi-telephone-fill"></i> +91 98765 43210
              </li>
              <li>
                <i className="bi bi-geo-alt-fill"></i> Cloud Lane, Book City,
                Earth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
