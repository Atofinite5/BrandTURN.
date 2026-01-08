import React, { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/ui/SmoothScroll';

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAuthClick = () => {
    // Add your authentication logic here
  };

  return (
    <SmoothScroll>
      <div className="bg-[#0A192F] min-h-screen text-white">
        <Navbar onAuthClick={handleAuthClick} />
        
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">Terms of Use</h1>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-400 mb-8">
                Last updated: January 2026
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">1. Agreement to Terms</h2>
                <p className="text-gray-300 mb-4">
                  By accessing or using our services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, do not use our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">2. Intellectual Property Rights</h2>
                <p className="text-gray-300 mb-4">
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">3. User Representations</h2>
                <p className="text-gray-300 mb-4">
                  By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-primary">4. Prohibited Activities</h2>
                <p className="text-gray-300 mb-4">
                  You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">5. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions about these Terms of Use, please contact us at support@brandturn.co.in.
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

export default TermsOfUse;
