"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Firebase", "Firestore",  "REST API"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-[#0a0a1a] rounded-xl p-6 shadow-xl shadow-purple-500/5 border border-[#1a1a2e]"
            >
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="px-4 py-2 bg-[#1a1a2e] rounded-full text-sm text-white hover:bg-purple-600/20 transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Want to work together?</h3>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-block"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
