import React, { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/ui/SmoothScroll';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAuthClick = () => {
    // Add your auth click handler logic here
  };

  return (
    <SmoothScroll>
      <div className="bg-[#0A192F] min-h-screen text-white">
        <Navbar onAuthClick={handleAuthClick} />
        
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">Privacy Policy</h1>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-400 mb-8">
                Last updated: January 2026
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
                <p className="text-gray-300 mb-4">
                  We collect information you provide directly to us when you fill out a form, request a demo, or communicate with us. The types of information we may collect include your name, email address, company name, and any other information you choose to provide.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">2. How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">
                  We use the information we collect to operate, maintain, and improve our services, to respond to your comments and questions, and to send you related information including confirmations, invoices, and technical notices.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">3. Sharing of Information</h2>
                <p className="text-gray-300 mb-4">
                  We do not share your personal information with third parties except as described in this policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">4. Data Security</h2>
                <p className="text-gray-300 mb-4">
                  We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">5. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at support@brandturn.co.in.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default PrivacyPolicy;
