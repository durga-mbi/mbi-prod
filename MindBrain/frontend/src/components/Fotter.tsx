import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp
} from "react-icons/fa";
import mindbrainLogo from "../assets/mindbrain-logo.webp";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll progress & Back to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Show scroll button after 300px
      setShowScrollTop(totalScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1e1e1e] text-white relative overflow-hidden">

      {/* Animated Scroll Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Brand - Staggered Animation */}
          <div
            className={`space-y-4 transform transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="flex-shrink-0 flex items-center cursor-pointer group w-fit">
              <div className="border border-white/10 p-1 group-hover:border-white/20 transition-colors bg-white">
                <img
                  loading="lazy"
                  decoding="async"
                  src={mindbrainLogo}
                  alt="Mindbrain Logo"
                  className="h-8 md:h-12 w-auto object-contain brightness-100"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Empowering businesses with innovative IT solutions and manpower outsourcing.
            </p>

            {/* Social Icons with Rotation Animation */}
            <div className="flex gap-3 pt-2">
              <SocialIcon href="#" icon={<FaFacebookF />} className="bg-gray-600" delay="100ms" />
              <SocialIcon href="#" icon={<FaTwitter />} className="bg-gray-600" delay="200ms" />
              <SocialIcon href="#" icon={<FaInstagram />} className="bg-gray-600" delay="300ms" />
              <SocialIcon href="#" icon={<FaLinkedinIn />} className="bg-gray-600" delay="400ms" />
            </div>
          </div>

          {/* Column 2: Quick Links - Slide Animation */}
          <div
            className={`transform transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block group">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/client">Our Clients</FooterLink>
              <FooterLink href="/ourprojects">Our Project</FooterLink>
              <FooterLink href="/contactus">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Column 3: Services - Slide Animation */}
          <div
            className={`transform transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block group">
              Services
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <FooterLink href="/services/it-product-development">IT Product Development</FooterLink>
              <FooterLink href="/services/manpower-outsourcing">Manpower Outsourcing</FooterLink>
              <FooterLink href="/services/iot-solution">IoT Solutions</FooterLink>
              <FooterLink href="/services/software-training">Training & Placement</FooterLink>
              <FooterLink href="/contactus">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact - Pulse Animation */}
          <div
            className={`transform transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block group">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3 group/item">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                <span className="group-hover/item:text-white transition-colors duration-300">DCB-718, DLF CYBER CITY, Chandaka Industrial Estate, Patia, Bhubaneswar, Odisha 751024</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <FaPhoneAlt className="text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                <span className="group-hover/item:text-white transition-colors duration-300">+91 9178587486</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <FaEnvelope className="text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                <span className="group-hover/item:text-white transition-colors duration-300">admin@mindbrain.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar with Hover Effect */}
        <div
          className={`border-t border-gray-800 pt-6 mt-6 text-center text-xs text-gray-500 transform transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="hover:text-gray-300 transition-colors duration-300">
            © 2026 Mindbrain Innovations Pvt. LTD. All rights reserved
          </p>
        </div>
      </div>

      {/* Animated Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={18} />
      </button>
    </footer>
  );
};

// --- Helper Components with Animations ---

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li className="group relative overflow-hidden">
    <a
      href={href}
      className="block py-1 relative z-10"
    >
      <span className="relative">
        {children}
        <span className="absolute -left-4 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
      </span>
    </a>
  </li>
);

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode; className: string; delay?: string }> = ({ href, icon, className, delay = "0ms" }) => (
  <a
    href={href}
    className={`w-9 h-9 flex items-center justify-center rounded-full text-white p-2 transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/30 ${className}`}
    style={{ transitionDelay: delay }}
  >
    <span className="transform transition-transform duration-300 group-hover:rotate-360">
      {icon}
    </span>
  </a>
);

export default Footer;
