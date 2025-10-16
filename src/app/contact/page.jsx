"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";

export default function ContactPage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback for SSR - always use English during SSR
  const translate = (key) => {
    if (!isMounted) {
      // Return English fallback during SSR
      const fallbacks = {
        features: "Features",
        demo: "Demo",
        pricing: "Pricing",
        getTheApp: "Get the app",
      };
      return fallbacks[key] || key;
    }

    try {
      return t && typeof t === "function" ? t(key) : key;
    } catch (error) {
      return key;
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    setMessageText(
      "Thank you for your message! We'll get back to you within 24 hours."
    );
    setShowMessage(true);

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Hide message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0e1230] to-[#0b1020] text-white font-sans">
      {/* Background blur orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Contact Support
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We&apos;re here to help. Get in touch with our support team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
              <h2 className="text-2xl font-bold mb-8 tracking-tight">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-8"
                  >
                    <option value="">Select a topic</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Please describe your issue or question in detail..."
                  />
                  <p className="text-white/60 text-sm mt-2">
                    {500 - formData.message.length} characters remaining
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 py-3 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer"
                >
                  Send Message
                </button>
              </form>

              {/* Success/Error Messages */}
              {showMessage && (
                <div className="mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30">
                  <p>{messageText}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Hours */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-time-line text-indigo-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Support Hours
                  </h3>
                </div>
                <div className="text-white/80 space-y-2">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-violet-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Response Time
                  </h3>
                </div>
                <div className="text-white/80 space-y-2">
                  <p>General inquiries: Within 24 hours</p>
                  <p>Technical support: Within 12 hours</p>
                  <p>Billing issues: Within 6 hours</p>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-question-line text-fuchsia-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Quick Help
                  </h3>
                </div>
                <div className="text-white/80 space-y-3">
                  <div>
                    <p className="font-medium text-white">
                      Can&apos;t access your account?
                    </p>
                    <p className="text-sm">
                      Try resetting your password or check your email for
                      verification.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      App not working properly?
                    </p>
                    <p className="text-sm">
                      Make sure you have the latest version installed and
                      restart the app.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Billing questions?</p>
                    <p className="text-sm">
                      Check your subscription status in the app settings or
                      contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
