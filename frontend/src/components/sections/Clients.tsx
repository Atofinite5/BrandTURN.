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
        <section id="clients" className="py-24 bg-black overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <p className="text-gray-500 uppercase tracking-widest text-sm">Trusted by Industry Leaders</p>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div ref={marqueeRef} className="flex whitespace-nowrap gap-20 md:gap-28 items-center px-12">
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="flex items-center gap-4 select-none"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="h-12 w-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                                loading="lazy"
                            />
                            <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-white/70 font-semibold">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
            </div>
        </section>
    );
};

export default Clients;
