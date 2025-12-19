"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false)
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('.mobile-sidebar') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Logo - fixed to the left corner (hidden on mobile) */}
      <Link 
        href="/"
        className={cn(
          "hidden md:block fixed left-10 z-50 transition-all duration-500 hover:opacity-80",
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

      {/* Desktop Navigation (hidden on mobile) */}
      <nav
        className={cn(
          "hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
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
                  "relative px-6 py-2.5 rounded-full text-2xl font-medium transition-colors duration-300",
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

      {/* Mobile Header (visible only on mobile) */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-xl bg-white/10 border-b border-white/20",
        isScrolled ? "shadow-lg" : ""
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          <h1 
            className="text-3xl font-bold text-white tracking-tight" 
            style={{ fontFamily: "'Nature Beauty', serif" }}
          >
            Kunthive
          </h1>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Contact"
          >
            <Phone className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Menu */}
      <div
        className={cn(
          "mobile-sidebar md:hidden fixed top-0 left-0 bottom-0 w-72 z-50 transition-transform duration-300 ease-out",
          "backdrop-blur-xl bg-white/10 border-r border-white/20 shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image 
              src="/logo-k.png" 
              alt="Kunthive Logo" 
              width={50} 
              height={50}
              className="w-auto h-12 object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-xl text-xl font-medium transition-all duration-200",
                    "hover:bg-white/10 active:scale-95",
                    activeSection === item.id 
                      ? "bg-white/20 text-white" 
                      : "text-white/70"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
