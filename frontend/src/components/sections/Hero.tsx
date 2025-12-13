import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SpotlightButton from '../ui/SpotlightButton';
import { useAuth } from '../../context/AuthContext';
import Aurora from '../ui/Aurora';
import ImageTrail from '../ui/ImageTrail';

interface HeroProps {
    onAuthClick: () => void;
}

const Hero = ({ onAuthClick }: HeroProps) => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            textRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
        )
            .fromTo(
                subTextRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.5'
            );

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;

            gsap.to(heroRef.current, {
                '--x': x,
                '--y': y,
                duration: 0.5,
                ease: 'power1.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-zinc-950"
            style={{ perspective: '1000px' } as React.CSSProperties}
        >
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className="absolute inset-0 z-0">
                <div style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
                    <ImageTrail
                        items={[
                            'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=2574&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop',
                        ]}
                        variant={1}
                    />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center transform-style-3d pointer-events-none">
                <h1
                    ref={textRef}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter font-display mb-8 leading-tight"
                    style={{ transform: 'translateZ(50px)' }}
                >
                    We Turn Brands <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Into Icons
                    </span>
                </h1>

                <p
                    ref={subTextRef}
                    className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light"
                    style={{ transform: 'translateZ(30px)' }}
                >
                    Elevate your digital presence with cutting-edge design, immersive experiences, and strategic branding that leaves a lasting impact.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-30">
                <ChevronDown size={32} />
            </div>

            {/* Gradient Overlay for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Hero;
