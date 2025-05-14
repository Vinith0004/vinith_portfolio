"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Text animation for each character - simplified for mobile
  const textAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.01 : 0.03,
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: isMobile ? 20 : 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const text =
    "I’m a Full Stack Developer and AI enthusiast, passionate about creating innovative web applications and intelligent systems. With experience in React.js, Tailwind CSS, Firebase, and AI/NLP technologies, I strive to build impactful, user-centric solutions.";

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={item} className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Me</span>
            </h2>
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textAnimation}
              className="text-gray-300 mb-6 leading-relaxed"
            >
              {isMobile
                ? text // On mobile, don't animate each character for better performance
                : text.split("").map((char, index) => (
                    <motion.span key={index} variants={letterAnimation}>
                      {char}
                    </motion.span>
                  ))}
            </motion.p>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">React</span>
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">Next.js</span>
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">JavaScript</span>
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">TypeScript</span>
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">Tailwind CSS</span>
              <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">Node.js</span>
               <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm"> REST APIs</span>
                <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm"> NetworkX</span>
                 <span className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm">Folium</span>
                  
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-block touch-feedback"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>

          {/* Profile Picture Section with Large Size */}
          <motion.div variants={item} className="relative flex justify-center md:justify-start">
            <motion.div
              className="w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/aboutme.png" // Replace with actual profile picture
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
