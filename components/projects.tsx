"use client"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const projects = [
  {
    title: "Symposium FullStack Website",
    description: "Integrated features like event registration, live countdown, and dynamic schedule updates.",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "Firebase", "Firestore", "Responsive Design", "Deployment", "Git"],
    image: "/asthra-portfolio.png",
    github: "https://github.com/Vinith0004",
    demo: "https://asthra2k24-chi.vercel.app/",
  },
  {
    title: "Ethical Legal AI Chatbot",
    description: "Implemented bias detection and fair response generation using a fine-tuned BERT model on Indian legal datasets.",
    tags: ["Python",
  "Streamlit",
  "RAG",
  "LLMs",
  "LLaMA",
  "FAISS",
  "BERT",
  "Vector Embeddings",
  "AI Ethics",
  "NLP"],
    image: "/legal.png",
    github: "https://github.com/Vinith0004",
    demo: "https://ethical-legal-chatbot-1.streamlit.app/",
  },
  {
    title: "Flight Routes Analyzer Using Dijkstra Algorithm",
    description: "Developed a flight route optimization system leveraging Dijkstra’s algorithm for shortest path analysis between global airports.",
    tags: ["Python", "Streamlit", "NetworkX", "Folium", "AviationStack API","Dijikstra Algorithm"],
    image: "/flight.png",
    github: "https://github.com/Vinith0004",
    demo: "https://airlinesanalyzer.streamlit.app/",
  },
  {
    title: "Portfolio",
    description: "A sleek, responsive portfolio built with Next.js, showcasing projects, skills, and experience.",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "Next.js","Emailjs","Node js"],
    image: "/portfolio sc.png",
    github: "https://github.com/Vinith0004",
    demo: "https://asthra2k24-chi.vercel.app/",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Explore my recent work and creative endeavors in web development
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTouchDevice = useMediaQuery("(pointer: coarse)")

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-100, 100], [isMobile ? 5 : 10, isMobile ? -5 : -10])
  const rotateY = useTransform(xSpring, [-100, 100], [isMobile ? -5 : -10, isMobile ? 5 : 10])

  const handleMouseMove = (event) => {
    if (isTouchDevice) return
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleTouchMove = (event) => {
    const touch = event.touches[0]
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((touch.clientX - centerX) * 0.5)
    y.set((touch.clientY - centerY) * 0.5)
  }

  const handleInteractionEnd = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      className="group perspective-1000"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={() => isTouchDevice && setIsHovered(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.3 }}
        className="bg-[#0a0a1a] rounded-xl overflow-hidden shadow-xl shadow-purple-500/5 border border-[#1a1a2e] h-full flex flex-col"
      >
        <div className="relative overflow-hidden">
          <div className="h-48 overflow-hidden">
            <motion.img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                scale: isHovered ? 1.1 : 1,
                transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            style={{ transform: "translateZ(20px)" }}
          ></div>
        </div>
        <motion.div
          className="p-6 flex-1 flex flex-col"
          style={{
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
          <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-[#1a1a2e] text-teal-400"
                style={{
                  transform: isHovered ? `translateZ(${60 + i * 5}px)` : "translateZ(0px)",
                  transition: `transform 0.3s ease-out ${i * 0.05}s`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="flex gap-4"
            style={{
              transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out 0.1s",
            }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#1a1a2e] text-white hover:bg-purple-600 transition-colors duration-300"
              aria-label="GitHub Repository"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#1a1a2e] text-white hover:bg-teal-600 transition-colors duration-300"
              aria-label="Live Demo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
