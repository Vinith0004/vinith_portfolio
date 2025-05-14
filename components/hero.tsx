"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-16 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-sm sm:text-base font-medium text-teal-400">Hello, I am</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
            VINITH
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Crafting stellar digital experiences with modern web technologies. Turning ideas into reality through code.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          
           <a
            href="https://drive.google.com/file/d/1cOtQ4vT2cNq1zgR7MjhgADBzOQp25ujM/view?usp=sharing"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-red-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-teal-400 text-teal-400 font-medium hover:bg-teal-400/10 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
        
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="animate-bounce" size={20} />
        </a>
        
      </motion.div>
    </section>
    
  )
}
