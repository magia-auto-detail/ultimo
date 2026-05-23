import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const createInquiry = useMutation(api.inquiries.create);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    try {
      await createInquiry({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        package: formData.get('package') as string,
        vehicle: formData.get('vehicle') as string,
        notes: formData.get('notes') as string,
      });
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-zinc-950">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Magia Auto Detail</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-widest">Services</a>
            <a href="#packages" className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-widest">Packages</a>
            <a href="#about" className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-widest">About</a>
            <a href="https://www.instagram.com/magiaautodetailllc/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#contact" className="bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-amber-400 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)]">Book Now</a>
          </div>

          <button className="md:hidden text-zinc-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-4">
            <a href="#services" className="block text-sm font-medium uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#packages" className="block text-sm font-medium uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Packages</a>
            <a href="#about" className="block text-sm font-medium uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="https://www.instagram.com/magiaautodetailllc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="#contact" className="block bg-amber-500 text-zinc-950 px-6 py-3 rounded-full font-bold text-center uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Book Now</a>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=2062" 
              alt="Luxury car detailing" 
              className="w-full h-full object-cover grayscale opacity-40 scale-105 animate-pulse-slow"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-[0.9]">
                The Ultimate <span className="text-amber-500">Gloss</span> <br /> For Your Vehicle
              </h1>
              <p className="text-zinc-400 text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl font-light">
                Expert exterior restoration and protection serving the <span className="text-zinc-100 font-semibold">Sacramento region</span>. Specializing in paint correction and premium ceramic coatings for the ultimate mirror finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#packages" className="bg-amber-500 text-zinc-950 px-10 py-5 rounded-md font-bold text-lg hover:bg-amber-400 hover:-translate-y-1 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center text-center uppercase tracking-widest">
                  View Our Packages
                </a>
                <a href="#contact" className="border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm text-zinc-100 px-8 py-4 rounded-md font-bold text-lg hover:bg-zinc-800 transition-transform active:scale-95 flex items-center justify-center text-center">
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-amber-500 font-semibold tracking-wider uppercase mb-2">Our Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Premium Detailing Services</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Outside Wash & Clay</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">A thorough hand wash followed by a clay bar treatment to remove embedded contaminants, leaving your paint smooth and ready for protection.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Paint Polishing</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Restore your paint's clarity and depth. We remove swirls, light scratches, and oxidation to bring back that showroom shine.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Ceramic Coating</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">The ultimate protection. A semi-permanent shield that adds extreme hydrophobicity, UV protection, and intense gloss for years.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Paint Sealant</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">A synthetic alternative to wax that typically provides 6–12 months of high-performance surface protection.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Iron Decontamination</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Deep cleaning of wheels and tires, including the chemical removal of corrosive brake dust and embedded iron particles.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Water Spot Removal</h4>
                <p className="text-zinc-400 leading-relaxed text-sm mb-4">Specialized treatment to eliminate stubborn mineral deposits and etchings from your paint and glass surfaces.</p>
                <div className="text-amber-500 font-bold text-xs uppercase tracking-widest">Requires custom quote / extra fee</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Engine Bay Cleaning</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Safely degreasing and dressing the engine compartment for a "like-new" look and improved thermal efficiency.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Steam Cleaning & Extraction</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Sanitizing upholstery and extracting deep-seated dirt and bacteria from carpets and fabric seats.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Deep Vacuuming & Air Purge</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Removal of debris from carpets, floor mats, and hard-to-reach crevices using high-pressure compressed air.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Leather Cleaning & Conditioning</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Specialized treatment to remove oils and grime while restoring suppleness and a soft feel to leather surfaces.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Dash & Console Detail</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Deep cleaning of all plastic, vinyl, and rubber surfaces followed by a premium UV protectant (matte or satin finish).</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M18 12a5 5 0 1 0-10 0"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Glass & Mirror Clarity</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Streak-free cleaning of all interior and exterior windows and mirrors for maximum visibility and safety.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Headlight Restoration</h4>
                <p className="text-zinc-400 leading-relaxed text-sm">Professional sanding, polishing, and sealing to remove oxidation and yellowing, restoring factory clarity and night-time visibility.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.886H3.94l4.975 3.615L7.004 18.38 12 14.77l4.996 3.615-1.912-5.88 4.975-3.614h-6.148L12 3z"/><path d="M12 12v6"/><path d="M10 15h4"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Hazard Chemical Removal</h4>
                <p className="text-zinc-400 leading-relaxed text-sm mb-4">Professional removal of hazardous chemicals, spills, or biological contaminants from interior or exterior surfaces.</p>
                <div className="text-amber-500 font-bold text-xs uppercase tracking-widest">Requires custom quote / extra fee</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors group p-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">Maintenance Program</h4>
                <p className="text-zinc-400 leading-relaxed text-sm mb-6">Keep your vehicle in pristine condition year-round with our weekly or bi-weekly maintenance detailing, customized to your preference and vehicle needs.</p>
                <a 
                  href="#contact" 
                  onClick={() => {
                    const select = document.getElementById('package') as HTMLSelectElement;
                    if (select) select.value = 'Maintenance Program';
                  }}
                  className="inline-block bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all active:scale-95"
                >
                  Join Program
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-24 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-amber-500 font-semibold tracking-wider uppercase mb-2">Our Packages</h2>
              <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Premium Service Bundles</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col hover:border-amber-500/50 transition-colors">
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Basic Wash</h4>
                <p className="text-zinc-400 text-sm mb-6">Interior and exterior wash</p>
                <div className="flex flex-col">
                  <div className="text-3xl font-extrabold text-amber-500">$120</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Starting at</div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col hover:border-amber-500/50 transition-colors">
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Paint Correction Stage 1</h4>
                <p className="text-zinc-400 text-sm mb-6">Light defect removal</p>
                <div className="flex flex-col">
                  <div className="text-3xl font-extrabold text-amber-500">$140</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Starting at</div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col hover:border-amber-500/50 transition-colors">
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Paint Correction Stage 2</h4>
                <p className="text-zinc-400 text-sm mb-6">Moderate defect removal</p>
                <div className="flex flex-col">
                  <div className="text-3xl font-extrabold text-amber-500">$400</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Starting at</div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col hover:border-amber-500/50 transition-colors">
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Paint Correction Stage 3</h4>
                <p className="text-zinc-400 text-sm mb-6">Heavy defect removal</p>
                <div className="flex flex-col">
                  <div className="text-3xl font-extrabold text-amber-500">$800</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Starting at</div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col hover:border-amber-500/50 transition-colors lg:col-span-2">
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Ceramic Coating</h4>
                <p className="text-zinc-400 text-sm mb-6">Premium long-term protection</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div>
                    <div className="text-3xl font-extrabold text-amber-500">$200</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Small Vehicles</div>
                  </div>
                  <div className="hidden sm:block w-px bg-zinc-800 self-stretch"></div>
                  <div>
                    <div className="text-3xl font-extrabold text-amber-500">$250</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Trucks / SUVs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-zinc-950 border-t border-zinc-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=2062" 
                  alt="Detailing process" 
                  className="rounded-2xl shadow-2xl shadow-amber-500/10 grayscale"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-amber-500 font-semibold tracking-wider uppercase mb-2">Why Magia</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-tight">Expert Restoration Since 2018</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed font-light">
                  With over 6 years of dedicated service, we've mastered the art of automotive preservation. We believe your vehicle is more than just transportation—it's a high-value asset that deserves professional-grade protection against the elements, road debris, and time itself.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-amber-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 uppercase tracking-wider text-xs">Preserve Your Resale Value</h5>
                      <p className="text-zinc-400 text-sm font-light">Regular professional detailing isn't an expense; it's an investment. We prevent permanent paint damage and interior wear, ensuring your car retains maximum value for years to come.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-amber-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 uppercase tracking-wider text-xs">Advanced Chemical Science</h5>
                      <p className="text-zinc-400 text-sm font-light">We don't just wash cars; we apply chemical science. From pH-balanced cleaners to aerospace-grade ceramic coatings, we use technology that shields your paint from UV rays and oxidation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-amber-500 font-semibold tracking-wider uppercase mb-2">Book Your Detail</h2>
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Request A Free Quote</h3>
                <p className="text-zinc-400 mt-4 font-light">Fill out the form below and we'll get back to you with a personalized quote.</p>
              </div>

              <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
                {formStatus === 'success' ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Request Received!</h4>
                    <p className="text-zinc-400 mb-8">We've received your inquiry and will contact you shortly via phone or email.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-amber-500 font-bold uppercase tracking-widest text-sm hover:text-amber-400 transition-colors"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Full Name</label>
                      <input 
                        required
                        id="name"
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Phone Number</label>
                      <input 
                        required
                        id="phone"
                        name="phone"
                        type="tel" 
                        placeholder="(916) 000-0000"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="vehicle" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Vehicle Info</label>
                      <input 
                        required
                        id="vehicle"
                        name="vehicle"
                        type="text" 
                        placeholder="Year, Make, Model"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="package" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Selected Package</label>
                      <select 
                        required
                        id="package"
                        name="package"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                      >
                        <option value="">Select a package</option>
                        <option value="Basic Wash">Basic Wash</option>
                        <option value="Paint Correction Stage 1">Paint Correction Stage 1</option>
                        <option value="Paint Correction Stage 2">Paint Correction Stage 2</option>
                        <option value="Paint Correction Stage 3">Paint Correction Stage 3</option>
                        <option value="Ceramic Coating">Ceramic Coating</option>
                        <option value="Maintenance Program">Maintenance Program</option>
                        <option value="Other">Other / Custom</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label htmlFor="notes" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Additional Notes</label>
                      <textarea 
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder="Tell us about the condition of the vehicle or any specific requests..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-amber-500 text-zinc-950 font-black py-5 rounded-xl uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Quote Request'}
                      </button>
                      {formStatus === 'error' && (
                        <p className="text-red-500 text-xs text-center mt-4 uppercase tracking-widest font-bold">Failed to send. Please call us directly.</p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-amber-500 text-zinc-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Get Your Free Quote Today</h2>
            <p className="text-zinc-900 text-xl mb-10 max-w-2xl mx-auto font-medium">
              Call, text, or email us for a free consultation and a personalized quote for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:magiaautodetailllc@gmail.com" className="inline-block bg-zinc-950 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-900 transition-all shadow-xl uppercase tracking-widest">
                Contact Us
              </a>
              <a href="tel:9162189926" className="inline-block bg-zinc-100 text-zinc-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all shadow-xl border border-zinc-200 uppercase tracking-widest">
                916-218-9926
              </a>
            </div>
            <p className="mt-8 text-zinc-800 text-xs italic font-medium">
              *Disclaimer: Any booked appointment that is cancelled will face a $60 cancellation fee.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-amber-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <span className="font-bold uppercase tracking-tighter">Magia Auto Detail</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Magia Auto Detail LLC. All rights reserved.
            </p>
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
              Serving the Sacramento Region
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-amber-500 text-[10px] uppercase tracking-[0.2em] font-black mb-1">Hours of Operation</p>
            <p className="text-zinc-400 text-xs uppercase tracking-widest">Mon–Sat: 7am–7pm</p>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Sun: Closed • Open on Holidays</p>
          </div>
          <div className="flex gap-6 text-zinc-400">
            <a href="https://www.instagram.com/magiaautodetailllc/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors text-xs uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="/qr-code.png" target="_blank" className="hover:text-amber-500 transition-colors text-xs uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded">QR Code</a>
            <div className="flex flex-col items-end sm:items-start gap-1">
              <a href="tel:9162189926" className="hover:text-amber-500 transition-colors text-xs uppercase tracking-widest">916-218-9926</a>
              <a href="mailto:magiaautodetailllc@gmail.com" className="text-amber-500 transition-colors text-[10px] uppercase tracking-widest font-bold">Get quote now</a>
            </div>
            <a href="mailto:magiaautodetailllc@gmail.com" className="hover:text-amber-500 transition-colors text-xs uppercase tracking-widest">Email</a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Accepted Payment Methods</span>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="text-xs font-medium border border-zinc-800 px-2 py-1 rounded">Cash</span>
              <span className="text-xs font-medium border border-zinc-800 px-2 py-1 rounded">Zelle</span>
              <span className="text-xs font-medium border border-zinc-800 px-2 py-1 rounded">Venmo</span>
              <span className="text-xs font-medium border border-zinc-800 px-2 py-1 rounded">Apple Pay</span>
              <span className="text-xs font-medium border border-zinc-800 px-2 py-1 rounded">Card</span>
            </div>
          </div>
          <div className="text-zinc-600 text-[10px] uppercase tracking-widest text-center md:text-right italic">
            * Payment is due upon completion of service
          </div>
        </div>
      </footer>
    </div>
  )
}
