import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-20">
      
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
