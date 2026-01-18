import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/ui/SmoothScroll';
import CircularGallery from '../components/ui/CircularGallery';
import { Upload, Code, Cpu, Rocket, Globe, Zap, CheckCircle, Send, Sparkles, Palette } from 'lucide-react';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  role: 'Internship' | 'Full-time' | 'Contract';
  portfolio: string;
  skills: string;
  motivation: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    role: 'Internship',
    portfolio: '',
    skills: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Network Request
    setTimeout(() => {
      const newApplication: JobApplication = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        role: formData.role as any,
        submittedAt: new Date().toISOString(),
        status: 'new'
      };

      // Save to LocalStorage (Simulated Backend)
      const existingApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      localStorage.setItem('jobApplications', JSON.stringify([newApplication, ...existingApps]));

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        university: '',
        role: 'Internship',
        portfolio: '',
        skills: '',
        motivation: ''
      });
    }, 1500);
  };

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-cyan-500/30">
        <Navbar onAuthClick={() => {}} />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
               }} 
          />
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest mb-6 animate-fade-in-up">
              // JOIN THE FUTURE OF MARKETING
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
              BUILD THE <br/> IMPOSSIBLE
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10 font-light leading-relaxed">
              We're looking for innovators, coders, and visionaries to shape the next era of digital experiences. 
              Join our internship program and work on real-time, on-ground projects that impact millions.
            </p>
          </div>
        </section>

        {/* Features / Why Join Section */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Why intern at BT buddy?</h2>
                 <p className="text-gray-400 max-w-md">More than just an internship. It's an initiation into the future of tech and creativity.</p>
              </div>
              <div className="flex gap-2">
                 <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                 <div className="w-4 h-1 bg-cyan-500/30 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Card 1 - Large spanning */}
              <div className="md:col-span-8 group relative p-10 rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent group-hover:from-cyan-500/[0.08] transition-all" />
                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 animate-pulse-slow">
                        <Rocket size={40} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Real World Impact</h3>
                        <p className="text-gray-400 leading-relaxed max-w-lg">
                            Forget coffee runs. You will be deploying production code, designing live campaigns, and managing real budgets from Week 1. 
                            We believe in learning by doing.
                        </p>
                    </div>
                 </div>
              </div>

              {/* Card 2 - Tall vertical */}
              <div className="md:col-span-4 md:row-span-2 group relative p-10 rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                 <div>
                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 w-fit mb-8 animate-pulse-slow">
                        <Cpu size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Tech-First Culture</h3>
                    <p className="text-gray-400 leading-relaxed">
                        We don't just use tools; we build them. Get hands-on with:
                    </p>
                    <ul className="mt-6 space-y-3">
                        {['Groq & Llama 3', 'React & Three.js', 'WebGL shaders', 'Automated Workflows'].map(tech => (
                            <li key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                {tech}
                            </li>
                        ))}
                    </ul>
                 </div>
                 <div className="mt-12 pt-8 border-t border-white/5">
                    <span className="text-xs uppercase tracking-widest text-white/40">Tech Stack</span>
                 </div>
              </div>

              {/* Card 3 - Medium spanning */}
              <div className="md:col-span-8 group relative p-10 rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                 <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/[0.03] to-transparent group-hover:from-blue-500/[0.08] transition-all" />
                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="space-y-4 flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-white">Global Opportunities</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Work with clients from New York to Singapore. Understand global market dynamics and cultural nuances in design.
                        </p>
                    </div>
                     <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 animate-pulse-slow">
                        <Globe size={40} />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internship Tracks Section */}
        <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
             {/* Background glow */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div>
                        <span className="text-cyan-500 font-mono text-sm tracking-wider uppercase mb-3 block">Choose your path</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Open Tracks</h2>
                    </div>
                    <p className="text-gray-400 mt-4 md:mt-0 text-sm md:text-base max-w-xs text-right hidden md:block">
                        Select the domain that aligns with your skills and passion.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                        {
                            title: "Engineering & Dev",
                            desc: "Build scalable systems using Next.js, Node, and Cloud infrastructure. Architect the core of BT buddy.",
                            skills: ["React", "Typescript", "AWS", "Node.js"],
                            icon: Code,
                            color: "text-blue-400",
                            bg: "bg-blue-500/10"
                        },
                        {
                            title: "AI & Innovation",
                            desc: "Work with LLMs, RAG pipelines, and agentic workflows. Push the boundaries of what's possible.",
                            skills: ["Python", "Groq", "LangChain", "OpenAI"],
                            icon: Sparkles,
                            color: "text-purple-400",
                            bg: "bg-purple-500/10"
                        },
                        {
                            title: "Design & Creative",
                            desc: "Craft immersive 3D experiences, motion graphics and high-fidelity UIs that tell a story.",
                            skills: ["Figma", "Three.js", "Blender", "After Effects"],
                            icon: Palette,
                            color: "text-pink-400",
                            bg: "bg-pink-500/10"
                        }
                     ].map((track, i) => (
                         <div key={i} className="group p-8 bg-[#0A0A0A] border border-white/5 hover:border-white/20 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-start justify-between min-h-[320px]">
                            <div>
                                <div className={`w-14 h-14 ${track.bg} ${track.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <track.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{track.title}</h3>
                                <p className="text-gray-400 mb-8 text-sm leading-relaxed">{track.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {track.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-xs text-gray-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                         </div>
                     ))}
                </div>
            </div>
        </section>

        {/* Life at grow+ Gallery */}
        <section className="py-20 bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Life at BT buddy</h2>
                 <p className="text-gray-400">Collaboration, innovation, and occasional pizza parties.</p>
            </div>
            <div className="h-[600px] w-full relative cursor-grab active:cursor-grabbing">
                <CircularGallery 
                    items={[
                        { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200', text: 'Team Brainstorming' },
                        { image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200', text: 'Strategy Sessions' },
                        { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200', text: 'Client Pitches' },
                        { image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200', text: 'Workshops' },
                        { image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200', text: 'Office Vibes' },
                        { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200', text: 'Hackathons' },
                    ]}
                    bend={2}
                    textColor="#ffffff"
                    borderRadius={0.05}
                />
            </div>
        </section>

        {/* Application Form */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's build the future.</h2>
                <p className="text-gray-400 text-lg">
                    Tell us who you are, what you've built, and where you want to go. <br className="hidden md:block"/>
                    We read every single application personally.
                </p>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                 {/* Decorative background */}
                 <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                 
                 {isSuccess ? (
                    <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">We've got it.</h3>
                      <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                        Thanks for reaching out! Our team is reviewing your details. If there's a match, expect to hear from us within 48 hours.
                      </p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 text-white hover:text-cyan-400 font-medium text-sm border-b border-white/20 hover:border-cyan-400 pb-1 transition-all"
                      >
                        Submit another application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      
                      <div className="space-y-6">
                         {/* Personal Info Group */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="jane@example.com"
                                />
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                             <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">University / Org</label>
                                <input 
                                    type="text" 
                                    name="university"
                                    required
                                    value={formData.university}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="Current institution"
                                />
                            </div>
                         </div>
                      </div>

                      {/* Role Selection */}
                      <div className="py-2">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">I'm interested in</label>
                        <div className="flex flex-wrap gap-3">
                          {['Internship', 'Full-time', 'Contract'].map((role) => (
                            <label key={role} className={`cursor-pointer border rounded-full px-6 py-2 transition-all duration-300 ${
                              formData.role === role 
                                ? 'bg-white text-black border-white' 
                                : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
                            }`}>
                              <input 
                                type="radio" 
                                name="role" 
                                value={role} 
                                checked={formData.role === role}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <span className="text-sm font-medium">{role}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Deep Dive */}
                      <div className="space-y-6">
                         <div className="group">
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Portfolio / GitHub</label>
                            <div className="relative">
                                <Globe className="absolute left-0 top-3 text-gray-600 w-5 h-5 group-focus-within:text-cyan-500 transition-colors" />
                                <input 
                                    type="url" 
                                    name="portfolio"
                                    value={formData.portfolio}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="Where can we see your work?"
                                />
                            </div>
                         </div>

                         <div className="group">
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Skills Info</label>
                             <div className="relative">
                                <Code className="absolute left-0 top-3 text-gray-600 w-5 h-5 group-focus-within:text-cyan-500 transition-colors" />
                                <input 
                                    type="text" 
                                    name="skills"
                                    required
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10"
                                    placeholder="Languages, frameworks, tools..."
                                />
                            </div>
                         </div>

                         <div className="group">
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium group-focus-within:text-cyan-500 transition-colors">Your Story</label>
                            <textarea 
                              name="motivation"
                              rows={3}
                              required
                              value={formData.motivation}
                              onChange={handleChange}
                              className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none transition-all placeholder-white/10 resize-none"
                              placeholder="What drives you? What's the coolest thing you've built?"
                            />
                         </div>
                      </div>
                      
                      <div className="pt-4">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:bg-cyan-500 hover:text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                          >
                             {isSubmitting ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                  <span>Sending...</span>
                                </>
                             ) : (
                                <>
                                  <span>Submit Application</span>
                                  <Send className="w-4 h-4" />
                                </>
                             )}
                          </button>
                      </div>

                    </form>
                  )}
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Careers;
