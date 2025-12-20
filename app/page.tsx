"use client"
import { LiquidNavbar } from "@/components/liquid-navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background - easily changeable */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat animate-background-zoom" 
        style={{ backgroundImage: "url('/sample-background-image.jpg')" }}
      >
        {/* Optional dark overlay for better text readability - adjust opacity as needed */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <LiquidNavbar />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ClientsSection />
        <ContactSection />
      </main>
    </div>
  )
}
