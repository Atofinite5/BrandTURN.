import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
    'Agaro',
    'Ajanta',
    'Alpino',
    'Apollo Pharmacy',
    'Better by Design',
    'Chumbak',
    'Colorsar',
    'Fenestat',
    'Fytika',
    'Glutone',
    'Heso',
    'Manyavar',
    'Men Deserve',
    'Plum',
    'Snapdeal',
    'Winzo',
    'Yoho',
];

const Clients = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;

        const totalWidth = el.scrollWidth;

        gsap.to(el, {
            x: -totalWidth / 2,
            duration: 20,
            ease: 'none',
            repeat: -1,
        });
    }, []);

    return (
        <section id="clients" className="py-24 bg-black overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <p className="text-gray-500 uppercase tracking-widest text-sm">Trusted by Industry Leaders</p>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 md:gap-32 items-center">
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <span
                            key={index}
                            className="text-3xl md:text-5xl font-bold text-white/20 uppercase font-display select-none"
                        >
                            {logo}
                        </span>
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
