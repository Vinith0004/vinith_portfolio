"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import ParticlesBackground from "@/components/particles-background"
import SpaceBackground from "@/components/space-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { NavigationMenuSub } from "@radix-ui/react-navigation-menu"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { HomeIcon, User, Folder, Code2, Mail } from "lucide-react";
import { FloatingDockDemo } from "@/components/FloatingDockDemo"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const navItems = [
  { name: "Home", link: "#home", icon: <HomeIcon size={18} /> },
  { name: "About", link: "#about", icon: <User size={18} /> },
  { name: "Projects", link: "#projects", icon: <Folder size={18} /> },
  { name: "Skills", link: "#skills", icon: <Code2 size={18} /> },
  
];


  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <SpaceBackground />
      </div>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 z-50 origin-left"
        style={{ scaleX }}
      />
      <div className="relative z-10">
        <FloatingNav navItems={navItems} />
        <Hero />
        
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
