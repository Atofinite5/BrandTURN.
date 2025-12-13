import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const [iframeSrc, setIframeSrc] = useState("https://prezi.com/p/embed/OyTtDqJZyeIP4TSdcCuw/");

    useEffect(() => {
        const el = sectionRef.current;

        gsap.fromTo(
            textRef.current,
            { opacity: 0.2, y: 50, rotateX: 10 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'center 60%',
                    scrub: 1,
                },
            }
        );

        // Stats Animation
        const stats = document.querySelectorAll('.stat-item');
        gsap.fromTo(
            stats,
            { y: 50, opacity: 0, rotateX: 20, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                scale: 1,
                duration: 1.2,
                stagger: 0.3,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.stats-container',
                    start: 'top 85%',
                },
            }
        );

        // Iframe Animation
        gsap.fromTo(
            '#iframe_container',
            { scale: 0.9, opacity: 0, y: 30 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#iframe_container',
                    start: 'top 80%',
                },
            }
        );

        // Autoplay Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIframeSrc("https://prezi.com/p/embed/OyTtDqJZyeIP4TSdcCuw/?autoplay=1&muted=1");
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.4 }
        );

        if (el) {
            observer.observe(el);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden" style={{ perspective: '1000px' } as React.CSSProperties}>
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto transform-style-3d">
                    <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
                        Who We Are
                    </span>
                    <iframe 
                        src={iframeSrc} 
                        id="iframe_container" 
                        frameBorder="0" 
                        allowFullScreen={true} 
                        allow="autoplay; fullscreen" 
                        height="450" 
                        width="960"
                        className="w-full aspect-video rounded-xl shadow-2xl border border-white/10 bg-zinc-900"
                    ></iframe>
                    <div className="stats-container mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                        {[
                            { label: 'Projects', value: '150+' },
                            { label: 'Clients', value: '80+' },
                            { label: 'Awards', value: '12' },
                        ].map((stat, index) => (
                            <div key={index} className="stat-item text-center md:text-left">
                                <h3 className="text-5xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
