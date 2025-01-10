import React from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";

AOS.init();

const ReasonsToChooseUs = () => {
  return (
    <section className="bg-base-100 py-5 px-6 my-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-blue-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-base-content mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Discover what makes our service stand out from the competition.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Reason 1 */}
          <motion.div
            className="bg-white text-secondary-content p-6 rounded-lg shadow-md transform transition-all hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="800"
            whileHover={{ scale: 1.07 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center text-accent-content rounded-full">
                <img src={image1} alt="Top-rated Service" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-500">Top-rated Service</h3>
            <p>
              Our customers consistently rate us as one of the best review platforms in the industry.
            </p>
          </motion.div>

          {/* Reason 2 */}
          <motion.div
            className="bg-white text-secondary-content p-6 rounded-lg shadow-md transform transition-all hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="900"
            whileHover={{ scale: 1.07 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center text-accent-content rounded-full">
                <img src={image2} alt="Secure & Reliable" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-500">Secure & Reliable</h3>
            <p>
              We prioritize your data security and ensure our platform is reliable 24/7.
            </p>
          </motion.div>

          {/* Reason 3 */}
          <motion.div
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0 }}
            className="bg-white text-secondary-content p-6 rounded-lg shadow-md transform transition-all hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center text-accent-content rounded-full">
                <img src={image3} alt="User-Friendly" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-500">User-Friendly</h3>
            <p>
              Our intuitive design makes it easy for anyone to leave or analyze reviews.
            </p>
          </motion.div>

          {/* Reason 4 */}
          <motion.div
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0 }}
            className="bg-white text-secondary-content p-6 rounded-lg shadow-md transform transition-all hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="1100"
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center text-accent-content rounded-full">
                <img src={image4} alt="Anytime Support" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-500">Anytime Support</h3>
            <p>
              Our dedicated support team is available 24/7 to assist you with any queries or issues.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReasonsToChooseUs;
