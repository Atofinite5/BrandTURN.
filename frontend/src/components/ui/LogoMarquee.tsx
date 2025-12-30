import React from 'react';
import './LogoMarquee.css';

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

const LogoMarquee = () => {
    const looped = [...logos, ...logos];

    return (
        <div className="w-full overflow-hidden bg-black/20 backdrop-blur-sm py-6 border-y border-white/5 absolute bottom-0 left-0 z-20">
            <div className="flex items-center animate-marquee whitespace-nowrap gap-14 px-6">
                {looped.map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                        <img
                            src={logo.src}
                            alt={logo.name}
                            className="h-8 w-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                            loading="lazy"
                        />
                        <span className="text-sm uppercase tracking-[0.2em] font-medium">
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;
