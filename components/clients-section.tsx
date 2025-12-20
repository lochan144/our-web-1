"use client"

export function ClientsSection() {
  const clients = [
    { id: 1, name: "TechCorp Solutions" },
    { id: 2, name: "Digital Ventures" },
    { id: 3, name: "Innovation Labs" },
    { id: 4, name: "Global Systems" },
    { id: 5, name: "Future Dynamics" },
    { id: 6, name: "Nexus Industries" },
    { id: 7, name: "Quantum Partners" },
    { id: 8, name: "Vertex Group" },
  ]

  return (
    <section id="clients" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Our Clients
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Trusted by leading organizations across industries to deliver exceptional digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-white text-center">
                {client.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
