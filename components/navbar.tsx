"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.name.toLowerCase())
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.closest(".mobile-menu") === null && e.target.closest(".menu-button") === null) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050816]/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#home" className="text-xl font-bold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
                DEV<span className="text-white">SPACE</span>
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.name.toLowerCase()
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#1a1a2e]/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                >
                  {item.name}
                  {activeSection === item.name.toLowerCase() && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className="menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1a1a2e] focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu md:hidden bg-[#0a0a1a]/95 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveSection(item.name.toLowerCase())
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.name.toLowerCase()
                      ? "text-white bg-gradient-to-r from-purple-600/20 to-teal-600/20"
                      : "text-gray-300 hover:text-white hover:bg-[#1a1a2e]"
                  } transition-all duration-300`}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    initial={{ rotateX: -90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
