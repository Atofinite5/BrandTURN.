import React from 'react';

const logos = [
    "Google", "Microsoft", "Amazon", "Netflix", "YouTube", "Instagram", "Uber", "Spotify"
];

const LogoMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-black/20 backdrop-blur-sm py-8 border-y border-white/5 absolute bottom-0 left-0 z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                    <span key={index} className="mx-12 text-2xl font-bold text-white/20 uppercase tracking-widest font-display hover:text-white/40 transition-colors cursor-default">
                        {logo}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;
