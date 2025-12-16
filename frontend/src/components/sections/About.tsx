import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutPresentation } from '../presentation/AboutPresentation';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    return (
        <section id="about" ref={sectionRef} className="bg-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 w-full">
                <AboutPresentation />
            </div>
        </section>
    );
};

export default About;
