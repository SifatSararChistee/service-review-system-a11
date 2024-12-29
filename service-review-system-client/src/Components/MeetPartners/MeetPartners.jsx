import React from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const partners = [
  {
    name: "Microsoft",
    logo: "https://i.ibb.co.com/9V5n0R2/microsoft.jpg",
    description:
      "Microsoft is a leading global technology company specializing in software, hardware, and cloud services.",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description:
      "Google is a multinational company specializing in Internet-related services and products, including advertising technologies, search engines, cloud computing, and software.",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description:
      "Amazon is a multinational technology company focusing on e-commerce, cloud computing, online advertising, and artificial intelligence.",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    description:
      "IBM is a global technology and consulting company known for its hardware, software, and cloud-based services.",
  },
  {
    name: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    description:
      "Tesla is an electric vehicle and clean energy company, focusing on electric cars, battery energy storage, and renewable energy solutions.",
  },
  {
    name: "Spotify",
    logo: "https://i.ibb.co.com/HqCJV3B/Spotify-Logo.jpg",
    description:
      "Spotify is a global music streaming service that provides access to millions of songs, podcasts, and videos.",
  },
];

const MeetPartners = () => {
  return (
    <section className="py-16 bg-base-200 text-center px-10 mt-10">
      <motion.h2
        className="text-4xl font-semibold mb-8 text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Meet Our Partners
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg"
            key={index}
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <figure className="p-4">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-32 h-32 object-contain mx-auto"
              />
            </figure>
            <div className="card-body flex flex-col items-center">
              <h3 className="card-title text-xl font-semibold">{partner.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetPartners;
