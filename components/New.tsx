"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import emailjs from '@emailjs/browser'

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      if (!formRef.current) return

      await emailjs.sendForm(
        'service_zjf9d57', // Your Service ID
        'template_xq8rtdx', // Your Template ID
        formRef.current,
        'zL63NOicFb_G2y-gX' // Your Public Key
      )

      alert("Thank you for your message! I'll get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Failed to send message:", error)
      alert("Failed to send message. Please try again later.")
    } finally {
      setIsSending(false)
    }
  }

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <motion.div variants={item}>
            <div className="bg-[#0a0a1a] rounded-xl p-6 shadow-xl shadow-purple-500/5 border border-[#1a1a2e] h-full">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1a1a2e] rounded-full text-purple-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Email</h4>
                    <p className="text-white">vinith4000@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1a1a2e] rounded-full text-teal-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Phone</h4>
                    <p className="text-white">+91 9360460838</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1a1a2e] rounded-full text-blue-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Location</h4>
                    <p className="text-white">Chennai, India</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Vinith0004"
                    className="p-3 bg-[#1a1a2e] rounded-full text-white hover:bg-purple-600/20 transition-colors duration-300"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/a-vinith-642301282/"
                    className="p-3 bg-[#1a1a2e] rounded-full text-white hover:bg-purple-600/20 transition-colors duration-300"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://leetcode.com/u/vinith000/"
                    className="p-3 bg-[#1a1a2e] rounded-full text-white hover:bg-yellow-500/20 transition-colors duration-300"
                    aria-label="LeetCode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/LeetCode_log.png"
                      alt="LeetCode"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/vinith0004/?hl=en"
                    className="p-3 bg-[#1a1a2e] rounded-full text-white hover:bg-yellow-500/20 transition-colors duration-300"
                    aria-label="LeetCode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/instgram.png"
                      alt="LeetCode"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#0a0a1a] rounded-xl p-6 shadow-xl shadow-purple-500/5 border border-[#1a1a2e]"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="your name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="yourmail@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}