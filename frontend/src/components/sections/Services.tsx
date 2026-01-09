import CircularGallery from '../ui/CircularGallery';

const galleryItems = [
    {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        text: 'Strategy-Driven'
    },
    {
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        text: 'Guiding Brands'
    },
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        text: 'Smart Strategy'
    },
    {
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
        text: 'Brand Identity'
    },
    {
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
        text: 'Social Media'
    },
    {
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        text: 'Web Design'
    },
    {
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
        text: 'Marketing'
    },
    {
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        text: 'Creative Team'
    },
];

const serviceTags = ['Brand Identity', 'Social Media', 'Web Design', 'Marketing'];

const Services = () => {
    return (
        <section 
            id="services" 
            className="relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1e3a5f 0%, #2d5a8c 25%, #4f8ac1 50%, #72a5cd 75%, #7fb0d3 100%)'
            }}
        >
            {/* Top Gradient Binding - Smooth blend from Hero */}
            <div 
                className="absolute top-0 left-0 w-full h-24 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, #1e3a5f 0%, transparent 100%)'
                }}
            />

            <div className="container mx-auto px-6 relative z-10 pt-24">
                {/* Header */}
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="mb-6">
                        <img 
                            src="/assets/images/brandturn.co.in.png" 
                            alt="Brandturn Logo" 
                            className="w-24 h-24 object-contain"
                        />
                    </div>
                    <span className="text-white/60 font-medium tracking-[0.3em] uppercase text-sm mb-2 block">
                        BRANDTURN
                    </span>
                    <h2 className="text-4xl md:text-5xl font-didot font-bold text-white">
                        HOW WE HELP BRANDS GROW
                    </h2>
                </div>
            </div>

            {/* Circular Gallery */}
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery 
                    items={galleryItems}
                    bend={3} 
                    textColor="#ffffff" 
                    borderRadius={0.05} 
                    scrollEase={0.02}
                />
            </div>

            {/* Service Tags */}
            <div className="container mx-auto px-6 relative z-10 pb-10">
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {serviceTags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-6 py-3 rounded-full border border-white/30 text-white/90 text-sm font-medium
                                     hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div 
                className="w-full h-32 absolute bottom-0 left-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, #7fb0d3 100%)'
                }}
            />
        </section>
    );
};

export default Services;
