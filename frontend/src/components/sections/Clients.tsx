import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
    { name: 'AuraBloom Cosmetics', src: '/assets/logos/AuraBloomCosmetics.png' },
    { name: 'BloodConnect Foundation', src: '/assets/logos/BloodConnectFoundation.png' },
    { name: 'CloudNova Systems', src: '/assets/logos/CloudNovaSystems.png' },
    { name: 'FrameFox Productions', src: '/assets/logos/FrameFoxProductions.png' },
    { name: 'GreenGlobe Foundation', src: '/assets/logos/GreenGlobeFoundation.png' },
    { name: 'Hindrise Corp', src: '/assets/logos/HindriseCorp.png' },
    { name: 'LambdaSphere AI', src: '/assets/logos/LambdaSphereAI.png' },
    { name: 'Luxora Fashion House', src: '/assets/logos/LuxoraFashionHouse.png' },
    { name: 'MetroBank India', src: '/assets/logos/MetroBankIndia.png' },
    { name: 'Moonlit Media Co', src: '/assets/logos/MoonlitMediaCo.png' },
    { name: 'National Skill Network', src: '/assets/logos/NationalSkillNetworkNSN.png' },
    { name: 'NextEra Digital', src: '/assets/logos/NextEraDigital.png' },
    { name: 'PixelShift Studios', src: '/assets/logos/PixelShiftStudios.png' },
    { name: 'RoyalVerse Events', src: '/assets/logos/RoyalVerseEvents.png' },
    { name: 'Studio NeonArc', src: '/assets/logos/StudioNeonArc.png' },
    { name: 'TeraLaunch Innovations', src: '/assets/logos/TeraLaunchInnovations.png' },
    { name: 'UrbanCare Hospitals', src: '/assets/logos/UrbanCareHospitals.png' },
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
                                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg transition-colors group-hover:bg-black/50">
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="h-7 w-7 md:h-9 md:w-9 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
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
