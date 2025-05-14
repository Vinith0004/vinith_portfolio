"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Default to true for SSR if we can't detect
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }
    // Fallback for older browsers
    else {
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [matches, query])

  // During SSR, we default to false to avoid hydration mismatch
  if (!mounted) return false

  return matches
}
