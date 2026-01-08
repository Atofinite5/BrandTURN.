import React, { useState } from 'react';

const faqs = [
  {
    question: 'What services does BrandTURN offer?',
    answer: 'We provide end-to-end digital branding, marketing, content creation, and growth solutions tailored for modern businesses.'
  },
  {
    question: 'How do I get started with BrandTURN?',
    answer: 'Simply use the Contact Us form on our website or email us. Our team will reach out to understand your needs and guide you through the onboarding process.'
  },
  {
    question: 'Do you work with startups or only large brands?',
    answer: 'We work with startups, SMEs, and large enterprises. Our solutions are customized to fit your business stage and goals.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'Our pricing is flexible and project-based. After understanding your requirements, we provide a transparent quote with no hidden fees.'
  },
  {
    question: 'How soon can I see results?',
    answer: 'Timelines depend on the project scope, but most clients see measurable improvements within the first 4-8 weeks.'
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden pt-4 pb-24" style={{
  background: 'linear-gradient(180deg, #82afd0 0%, #7bb0d3 50%, #72a5cd 100%)'
}}>
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-display" style={{ color: '#ffffff' }}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden transition-all duration-300" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
            }}>
              <button
                className="w-full text-left px-6 py-5 text-lg font-medium flex justify-between items-center focus:outline-none transition-colors hover:bg-white/5"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                style={{ color: '#ffffff' }}
              >
                <span>{faq.question}</span>
                <span className={`ml-4 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-base animate-fade-in" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Smooth transition to Contact section */}
      <div 
        className="absolute bottom-0 left-0 w-full h-24 md:h-32 pointer-events-none"
        style={{
            background: 'linear-gradient(to bottom, transparent 0%, #e8e4dc 100%)'
        }}
      />
    </section>
  );
};

export default FAQ;
