"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
]

export function LiquidNavbar() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoverPillStyle, setHoverPillStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [activePillStyle, setActivePillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLUListElement>(null)
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  // Update active pill position when activeSection changes
  useEffect(() => {
    if (activeSection && buttonRefs.current[activeSection] && navRef.current) {
      const button = buttonRefs.current[activeSection]
      const nav = navRef.current
      const buttonRect = button.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      
      setActivePillStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      })
    }
  }, [activeSection])

  // Handle hover pill movement
  const handleMouseEnter = (itemId: string) => {
    setHoveredItem(itemId)
    if (buttonRefs.current[itemId] && navRef.current) {
      const button = buttonRefs.current[itemId]
      const nav = navRef.current
      const buttonRect = button.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      
      setHoverPillStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
        opacity: 1,
      })
    }
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
    setHoverPillStyle(prev => ({ ...prev, opacity: 0 }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      let foundActiveSection = false

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id)
            foundActiveSection = true
          }
        }
      })

      // If not in any section (e.g., hero section), clear active state
      if (!foundActiveSection) {
        setActiveSection("")
      }
    }

    handleScroll() // Call once on mount to set initial state
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Calculate offset to center the section in viewport
      // Account for navbar height and add padding to center the section better
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Logo - fixed to the left corner */}
      <Link 
        href="/"
        className={cn(
          "fixed left-10 z-50 transition-all duration-500 hover:opacity-80",
          isScrolled ? "top-4" : "top-6"
        )}
      >
        <Image 
          src="/logo-k.png" 
          alt="Kunthive Logo" 
          width={80} 
          height={80}
          className="w-auto object-contain"
          style={{
            height: 'calc(2rem + 2.5rem + 1.75rem)' // py-4 (2rem) + py-2.5 (1.25rem) + text-xl line-height (1.75rem)
          }}
        />
      </Link>

      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          isScrolled ? "top-4" : "top-6",
        )}
      >
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-8 py-4 shadow-2xl shadow-black/20">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        <ul 
          ref={navRef}
          className="flex items-center gap-1 relative z-10"
          onMouseLeave={handleMouseLeave}
        >
          {/* Fixed active section pill indicator */}
          {activeSection && (
            <div
              className="absolute top-0 h-full rounded-full bg-white/20 pointer-events-none transition-all duration-500 ease-out"
              style={{
                left: activePillStyle.left,
                width: activePillStyle.width,
                transform: 'translateY(0)',
              }}
            />
          )}

          {/* Floating hover glass pill */}
          <div
            className="absolute top-0 h-full rounded-full pointer-events-none backdrop-blur-md bg-gradient-to-b from-white/30 to-white/10 shadow-lg shadow-white/20"
            style={{
              left: hoverPillStyle.left,
              width: hoverPillStyle.width,
              opacity: hoverPillStyle.opacity,
              transform: 'translateY(0)',
              transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out',
            }}
          />

          {navItems.map((item) => (
            <li key={item.id}>
              <button
                ref={(el) => { buttonRefs.current[item.id] = el }}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                className={cn(
                  "relative px-6 py-2.5 rounded-full text-xl font-medium transition-colors duration-300",
                  activeSection === item.id ? "text-white" : "text-white/70",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      </nav>
    </>
  )
}
