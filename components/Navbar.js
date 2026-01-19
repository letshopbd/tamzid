'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background effect
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active link highlighting
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Adjusted offset for better accuracy
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        setActiveLink(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e, id) => {
    setIsOpen(false); // Close menu on click

    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Adjust for fixed navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setActiveLink(id);
        window.history.pushState(null, null, `#${id}`);
      }
    }
    // If not on home page, let the default Link behavior take over (navigates to /#id)
  };

  return (
    <nav
      className="navbar"
      id="navbar"
      style={{
        background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="nav-container">
        <div className="logo" style={{ zIndex: 1002 }}>
          <Link href="/" className="logo-text" style={{ textDecoration: 'none', color: 'inherit' }}>
            Tamzid<span className="logo-dot">.</span>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
            <Link
              key={item}
              href={`/#${item}`}
              className={`nav-link ${activeLink === item ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace('contact', 'Contact US')}
            </Link>
          ))}

          {/* Mobile Only CV Button */}
          <div className="mobile-cv-btn">
            <a
              href="/images/cv.pdf"
              download="S_M_Tamzid_Huda_CV.pdf"
              className="cv-btn"
              style={{ display: 'flex' }} // Force display in mobile menu
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Desktop Only CV Button */}
        <a
          href="/images/cv.pdf"
          download="S_M_Tamzid_Huda_CV.pdf"
          className="cv-btn desktop-only"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <span>Download CV</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      </div>
    </nav>
  );
}
