export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a2e]">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p className="text-gray-500 text-xs mt-2">
          Designed and built with ❤️ by{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            vinith
          </a>
        </p>
      </div>
    </footer>
  )
}
