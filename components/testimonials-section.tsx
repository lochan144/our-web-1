const testimonials = [
  {
    quote: "Working with Kunthive transformed our development process. Their developers are exceptional.",
    author: "Sarah Chen",
    role: "CTO, TechCorp",
    company: "TechCorp Inc.",
  },
  {
    quote: "The quality of talent and speed of delivery exceeded all our expectations. Highly recommended!",
    author: "Michael Rodriguez",
    role: "Product Lead",
    company: "InnovateLabs",
  },
  {
    quote: "Kunthive helped us scale our engineering team quickly without compromising on quality.",
    author: "Emily Watson",
    role: "Engineering Manager",
    company: "StartupXYZ",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">What Clients Say</h2>
        <p className="text-xl text-white/60 mb-16 max-w-3xl">Trusted by companies worldwide</p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <p className="text-lg text-white/90 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-white/10 pt-6">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-white/60">{testimonial.role}</div>
                <div className="text-sm text-white/70 font-medium mt-1">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
