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
    <section id="faq" className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center font-display">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl bg-[#181818]">
              <button
                className="w-full text-left px-6 py-5 text-lg font-medium text-white flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.question}</span>
                <span className={`ml-4 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-white/80 text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
