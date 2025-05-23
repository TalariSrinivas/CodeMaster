import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-12 text-lg">
          Have questions or feedback? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600 dark:text-purple-400" />
                <span>support@codemaster.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-green-600 dark:text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-pink-600 dark:text-pink-400" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Send a Message</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white px-6 py-2 rounded transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
