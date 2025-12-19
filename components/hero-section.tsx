"use client"

import { useState, useEffect } from "react"

export function HeroSection() {
  const [heroOpacity, setHeroOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      // Only apply on mobile
      if (window.innerWidth >= 768) {
        setHeroOpacity(1)
        return
      }

      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect()
        const threshold = window.innerHeight * 0.7
        
        // Calculate opacity based on how far the about section has entered
        // When about section top is at threshold, opacity should be 0
        // When about section top is below viewport, opacity should be 1
        const fadeStart = window.innerHeight
        const fadeEnd = threshold
        
        if (aboutRect.top > fadeStart) {
          setHeroOpacity(1)
        } else if (aboutRect.top < fadeEnd) {
          setHeroOpacity(0)
        } else {
          const opacity = (aboutRect.top - fadeEnd) / (fadeStart - fadeEnd)
          setHeroOpacity(opacity)
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo/Brand Name */}
        <h1 
          className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight transition-opacity duration-500 md:!opacity-100" 
          style={{ 
            fontFamily: "'Nature Beauty', serif",
            opacity: heroOpacity
          }}
        >
          Kunthive
        </h1>

        {/* Hero Message */}
        <p className="text-4xl md:text-6xl font-light text-white/90 mb-6 text-balance italic">Find the best developers here</p>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          Connecting you with exceptional talent for perpetual growth and innovation
        </p>

        {/* CTA Button */}
        <button 
          onClick={scrollToContact}
          className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/30"
        >
          <span className="relative z-10">Contact Us</span>
          <div className="absolute inset-0 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  )
}
