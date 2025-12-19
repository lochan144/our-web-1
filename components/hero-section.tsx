export function HeroSection() {
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
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Nature Beauty', serif" }}>Kunthive</h1>

        {/* Hero Message */}
        <p className="text-4xl md:text-6xl font-light text-white/90 mb-6 text-balance">Find the best developers here</p>

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
