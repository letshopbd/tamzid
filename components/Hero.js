'use client';

import { useEffect } from 'react';

export default function Hero() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const orbs = document.querySelectorAll('.orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>
            <div className="hero-content">
                <div className="hero-text">
                    <div className="greeting">
                        <svg width="30" height="30" viewBox="0 0 100 100" className="wave-icon">
                            <defs>
                                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path d="M 30 50 Q 35 30 50 35 Q 65 40 70 50 Q 75 60 70 70 Q 65 75 50 70 Q 35 65 30 50"
                                fill="url(#waveGradient)" />
                            <circle cx="45" cy="45" r="8" fill="#fef3c7" />
                            <path d="M 50 35 L 55 25 L 60 30 L 65 20 L 70 25" stroke="url(#waveGradient)" strokeWidth="4"
                                fill="none" strokeLinecap="round" />
                        </svg>
                        <span>Hello, I'm</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="gradient-text">S. M. Tamzid Huda</span>
                    </h1>
                    <h2 className="hero-subtitle">AI Expert | Web Developer & Designer with AI | Digital Marketer</h2>
                    <p className="hero-desc">
                        A passionate student leveraging AI to build innovative web solutions and create impactful digital
                        marketing strategies.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-wrapper">
                        <img src="images/profile.png" alt="S. M. Tamzid Huda" />

                        {/* Decorative Dots */}
                        <div className="decorative-dots dots-1">
                            {[...Array(8)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>

                        <div className="decorative-dots dots-2">
                            {[...Array(6)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
