import React, { useState } from "react";
import "../Styles/ContactUs.css";
import Navbar from "./Navbar";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoLocationSharp, IoPerson } from "react-icons/io5";
import { MdOutlineSubject } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import axios from "axios";

const ContactUs = () => {
  const userId=localStorage.getItem('userId')
  const [message, setMessage] = useState({userId});
  

  const handleChange = (e) => {
    setMessage((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); 
  
    axios
      .post("http://localhost:5001/sendMessage", message)
      .then((res) => {
        setMessage({}); 
      })
      .catch((err) => {
        console.error("Error sending message:", err.message);
      });
  };
  
  return (
    <div
      className="container-fluid flex-column homeContainer"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-left">
            <form className="glass-form">
              <div className="input-group">
                <span className="input-icon-left">
                  <IoPerson />
                </span>
                <input
                  type="text"
                  id="name"
                  value={message.userName}
                  placeholder="Your Name"
                  required
                  name="userName"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <span className="input-icon-left">
                  <MdEmail />
                </span>
                <input
                  value={message.userEmail}
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                  name="userEmail"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <span className="input-icon-left">
                  <MdOutlineSubject />
                </span>
                <input
                value={message.userSubject}
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  name="userSubject"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <span className="input-areaicon-left">
                  <RiMessage2Fill />
                </span>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  name="userMessage"
                  onChange={handleChange}
                  value={message.userMessage}
                ></textarea>
              </div>
              <button type="submit" onClick={handleSendMessage} className="btn-glass">
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className="contact-right">
            <h2>GET IN TOUCH</h2>
            <p>
              <i>
                {" "}
                We'd love to hear from you! Whether you have a question about
                features, pricing, or anything else our team is ready to help.
              </i>
            </p>
            <ul>
              <li>
                <i className="bi bi-envelope-fill"></i>{" "}
                <MdEmail className="ContactUsIcon" />
                help@ebookverse.com
              </li>
              <li>
                <i className="bi bi-telephone-fill"></i>{" "}
                <FaPhoneVolume className="ContactUsIcon" />
                +91 98765 43210
              </li>
              <li>
                <i className="bi bi-geo-alt-fill"></i>{" "}
                <IoLocationSharp className="ContactUsIcon" />
                Cloud Lane, Book City, Earth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
