import { Mail, User, MessageSquare } from "lucide-react";

const ContactPage = () => {
    return (
        <div className="flex justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-3xl text-center font-bold my-6 text-blue-500">Contact Us</h2>
          <form className="mt-6 space-y-4">
            <div className="flex flex-col">
              <label className="flex items-center mb-1 text-gray-700" htmlFor="name">
                <User className="w-5 h-5 mr-2" /> Name
              </label>
              <input id="name" type="text" placeholder="Enter your name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
              <label className="flex items-center mb-1 text-gray-700" htmlFor="email">
                <Mail className="w-5 h-5 mr-2" /> Email
              </label>
              <input id="email" type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
              <label className="flex items-center mb-1 text-gray-700" htmlFor="message">
                <MessageSquare className="w-5 h-5 mr-2" /> Message
              </label>
              <textarea id="message" placeholder="Enter your message" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default ContactPage;