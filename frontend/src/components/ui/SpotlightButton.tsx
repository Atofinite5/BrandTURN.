import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface SpotlightButtonProps {
    children: React.ReactNode;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    href?: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const SpotlightButton: React.FC<SpotlightButtonProps> = ({
    children,
    onClick,
    href,
    className = '',
    variant = 'primary',
}) => {
    const buttonRef = useRef<any>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);

        // Magnetic Effect
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(buttonRef.current, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        setOpacity(0);

        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const baseStyles = "relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group";

    const variants = {
        primary: "bg-primary text-black hover:shadow-[0_0_20px_rgba(252,163,17,0.5)]",
        secondary: "bg-secondary text-white hover:shadow-[0_0_20px_rgba(0,168,120,0.5)]",
        outline: "border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
        ghost: "text-white hover:bg-white/5",
    };
    const Component = href ? 'a' : 'button';
    const props = href ? { href } : { onClick };

    return (
        // @ts-ignore
        <Component
            ref={buttonRef}
            className={`${baseStyles} ${variants[variant]} ${className} `}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Spotlight Gradient */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15), transparent 40%)`,
                }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </Component>
    );
};

export default SpotlightButton;
