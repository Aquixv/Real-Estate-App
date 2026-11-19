"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Replace with your actual WhatsApp number (country code + number, no '+' or spaces)
  const whatsappNumber = "+2348146903439";
  const whatsappMessage = encodeURIComponent("Hi, I have an inquiry regarding a property listing.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "7fb5b5e9-09bb-44cc-b769-363c5d91de75");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className={styles.contactMain}>
      <div className={styles.contactContainer}>
        
        {/* Left Side: Contact Info */}
        <div className={styles.infoBlock}>
          <h1 className={styles.title}>Let&apos;s Talk Property.</h1>
          <p className={styles.subtitle}>
            Whether you&apos;re looking to buy, rent, or list a property on our platform, 
            our team is here to help you navigate every step.
          </p>
          
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <strong>Office</strong>
              <p>123 Victoria Island Blvd, Lagos</p>
            </div>
            <div className={styles.detailItem}>
              <strong>Direct</strong>
              <p>hello@Wehouse.com<br/>+234 123 456 7890</p>
            </div>

            {/* Modern Startup WhatsApp Handoff */}
            <div className={styles.whatsappBlock}>
              <strong>Prefer instant messaging?</strong>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappBtn}
              >
                <WhatsAppIcon />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className={styles.formBlock}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Jane Doe" required className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="jane@example.com" required className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us about the property you're looking for or want to list..." required className={styles.textarea}></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className={styles.submitBtn}
            >
              {status === "submitting" ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "success" && (
              <p className={styles.successMessage}>Thank you. Our team will be in touch shortly.</p>
            )}
            {status === "error" && (
              <p className={styles.errorMessage}>Something went wrong. Please try emailing us or reaching out on WhatsApp.</p>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}