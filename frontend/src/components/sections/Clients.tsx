import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
    { name: 'Manyavar', src: 'https://www.google.com/s2/favicons?domain=manyavar.com&sz=128' },
    { name: 'Apollo Pharmacy', src: 'https://www.google.com/s2/favicons?domain=apollopharmacy.in&sz=128' },
    { name: 'Dabur', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png' },
    { name: 'Colorbar', src: '/assets/logos/colorbar.png' },
    { name: 'Policybazaar', src: 'https://www.google.com/s2/favicons?domain=policybazaar.com&sz=128' },
    { name: 'Emami', src: 'https://www.google.com/s2/favicons?domain=emamiltd.in&sz=128' },
    { name: 'Snapdeal', src: 'https://www.google.com/s2/favicons?domain=snapdeal.com&sz=128' },
    { name: 'HDFC Bank', src: 'https://www.google.com/s2/favicons?domain=hdfcbank.com&sz=128' },
    { name: 'Plum', src: 'https://www.google.com/s2/favicons?domain=plumgoodness.com&sz=128' },
    { name: 'Ajanta', src: 'https://www.google.com/s2/favicons?domain=ajantapharma.com&sz=128' },
];

const Clients = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;

        const totalWidth = el.scrollWidth;

        gsap.fromTo(
            el,
            { x: 0 },
            {
                x: -totalWidth / 2,
                duration: 78,
                ease: 'none',
                repeat: -1,
                repeatRefresh: false,
            }
        );
    }, []);

    return (
        <>
            <section
                id="clients"
                className="relative overflow-hidden pt-4 pb-20"
                style={{
                    background: 'linear-gradient(180deg, #7fb0d3 0%, #75a8ce 45%, #6fa0c8 100%)'
                }}
            >
                {/* Top Gradient Binding - Smooth blend from Services */}
                <div 
                    className="absolute top-0 left-0 w-full h-24 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, #7fb0d3 0%, transparent 100%)'
                    }}
                />

                {/* Soft ambient glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-50 -left-16 w-[420px] h-[600px] rounded-full blur-[140px] bg-white/20" />
                    <div className="absolute -bottom-20 right-4 w-[800px] h-[600px] rounded-full blur-[150px] bg-white/18" />
                </div>


                <div className="relative z-10 container mx-auto px-6 mb-12 text-center">
                    <p className="uppercase tracking-[0.32em] text-[13px] font-semibold text-white/80">
                        Trusted by Industry Leaders
                    </p>
                </div>

                <div className="relative z-10 px-6 flex justify-center">
                    <div className="w-full max-w-6xl rounded-[28px] border border-white/18 bg-white/10 backdrop-blur-lg shadow-[0_25px_80px_rgba(0,0,0,0.22)] overflow-hidden h-28 md:h-36">
                        <div
                            className="relative w-full h-full flex items-center overflow-hidden"
                            style={{
                                WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
                                maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)'
                            }}
                        >
                            <div className="absolute inset-0 pointer-events-none z-10">
                                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#7fb0d3]/20 via-[#7fb0d3]/5 to-transparent" />
                                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#7fb0d3]/20 via-[#7fb0d3]/5 to-transparent" />
                            </div>

                            <div ref={marqueeRef} className="flex whitespace-nowrap gap-12 md:gap-20 items-center px-4 will-change-transform">
                                {[...logos, ...logos].map((logo, index) => (
                                    <div
                                        key={`${logo.name}-${index}`}
                                        className="flex items-center gap-5 select-none transition-transform duration-300 hover:scale-105 group"
                                    >
                                        <div className="h-12 md:h-16 px-2 md:px-4 min-w-[3rem] md:min-w-[4rem] rounded-xl bg-white flex items-center justify-center shadow-lg transition-colors overflow-hidden">
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium text-white/90 drop-shadow-sm group-hover:text-white transition-colors">
                                            {logo.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gradient Transition Zone between Clients and FAQ */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, #82afd0 100%)'
                    }}
                />
            </section>
        </>
    );
};

export default Clients;
