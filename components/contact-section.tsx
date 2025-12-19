export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Let's Work Together</h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          Ready to bring your project to life? Get in touch with us and let's create something amazing together.
        </p>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="text-left">
              <label className="block text-white/80 mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="text-left">
              <label className="block text-white/80 mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="text-left">
              <label className="block text-white/80 mb-2 text-sm font-medium">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-white/20 hover:bg-white/90"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">© 2025 Kunthive. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
