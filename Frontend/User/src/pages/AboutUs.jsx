
import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Reimagining Rentals</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            We are building the future of the shared economy, one rental at a time.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              At Rentalysis, we believe that access is better than ownership. Our mission is to connect people with the tools, gear, and experiences they need, without the burden of buying. We are committed to sustainability, community, and providing a seamless user experience.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-1">10k+</h3>
                <p className="text-sm text-neutral-500 font-medium uppercase">Active Users</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-1">50k+</h3>
                <p className="text-sm text-neutral-500 font-medium uppercase">Rentals Completed</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team working" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sustainability", desc: "Reducing waste by maximizing the lifespan of quality products." },
              { title: "Trust & Safety", desc: "Building a secure platform where every user is verified and every item is insured." },
              { title: "Innovation", desc: "Constantly improving our technology to make renting easier than buying." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
