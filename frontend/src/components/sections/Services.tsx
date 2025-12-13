import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Globe, Megaphone, Code, ArrowRight, CheckCircle2 } from 'lucide-react';
import SpotlightButton from '../ui/SpotlightButton';
import CardSwap, { Card } from '../ui/CardSwap';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
    {
        icon: <Palette className="w-12 h-12" />,
        title: 'Brand Identity',
        description: 'We craft unique visual identities that resonate with your audience and stand the test of time.',
        features: ['Logo Design', 'Brand Guidelines', 'Visual Strategy', 'Typography & Color'],
    },
    {
        icon: <Globe className="w-12 h-12" />,
        title: 'Web Design',
        description: 'Immersive, responsive, and user-centric websites that drive engagement and conversions.',
        features: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Mobile Responsiveness'],
    },
    {
        icon: <Code className="w-12 h-12   " />,
        title: 'Development',
        description: 'Robust and scalable frontend and backend solutions using the latest technologies.',
        features: ['Frontend (React/Vue)', 'Backend (Node/Python)', 'CMS Integration', 'E-commerce'],
    },
    {
        icon: <Megaphone className="w-12 h-12" />,
        title: 'Digital Marketing',
        description: 'Strategic campaigns that amplify your reach and connect you with the right customers.',
        features: ['SEO Optimization', 'Social Media Strategy', 'Content Marketing', 'Analytics'],
    },
];

const Services = () => {
    const sectionRef = useRef(null);

    return (
        <section id="services" ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
                        Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                        Services Built for <span className="text-primary">Growth</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Comprehensive design and technology solutions to help your business grow and stand out in the digital landscape.
                    </p>
                </div>

                <div className="flex justify-center items-center min-h-[600px] relative">
                    <CardSwap
                        cardDistance={60}
                        verticalDistance={70}
                        delay={5000}
                        pauseOnHover={false}
                        width="100%"
                        height="100%"
                    >
                        {servicesList.map((service, index) => (
                            <Card key={index} customClass="w-full max-w-4xl bg-zinc-900/90 border border-white/10 backdrop-blur-xl p-0 overflow-hidden">
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                                        <div className="mb-6 text-primary">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                        <SpotlightButton href="#contact" variant="outline" className="inline-flex items-center gap-2 w-fit">
                                            Get Started <ArrowRight size={20} />
                                        </SpotlightButton>
                                    </div>

                                    <div className="md:w-2/3 p-8 md:p-12 bg-black/20">
                                        <h4 className="text-lg font-semibold mb-6 text-gray-300">Key Deliverables</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <CheckCircle2 className="text-secondary w-5 h-5" />
                                                    <span className="text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CardSwap>
                </div>
            </div>
        </section>
    );
};

export default Services;
