'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [btnText, setBtnText] = useState('Send Message');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [btnStyle, setBtnStyle] = useState({});

    // Credentials from original script.js
    const SERVICE_ID = 'service_mrhuda';
    const TEMPLATE_ID = 'template_gay2dpz';
    const PUBLIC_KEY = 'BVrBMMTKUqJStYZOG';

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        setIsSubmitting(true);
        setBtnText('Sending...');
        setBtnStyle({ opacity: '0.7' });

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then(() => {
                // Success
                setBtnText('✓ Message Sent!');
                setBtnStyle({ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' });

                form.reset();
                alert('Thank you! Your message has been sent successfully.');

                setTimeout(() => {
                    setIsSubmitting(false);
                    setBtnText('Send Message');
                    setBtnStyle({});
                }, 3000);
            })
            .catch((error) => {
                // Error
                console.error('EmailJS Error:', error);
                setBtnText('✗ Failed to Send');
                setBtnStyle({ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' });

                alert('Oops! Something went wrong. Please try again or email me directly.');

                setTimeout(() => {
                    setIsSubmitting(false);
                    setBtnText('Send Message');
                    setBtnStyle({});
                }, 3000);
            });
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Get In Touch</span>
                    <h2 className="section-title">Let's Work Together</h2>
                </div>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-method">
                            <div className="method-icon">
                                <svg width="50" height="50" viewBox="0 0 100 100" className="icon-3d">
                                    <defs>
                                        <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <rect x="15" y="30" width="70" height="50" rx="5" fill="url(#emailGradient)"
                                        opacity="0.2" />
                                    <rect x="10" y="25" width="70" height="50" rx="5" fill="url(#emailGradient)" />
                                    <path d="M 10 25 L 45 50 L 80 25" stroke="white" strokeWidth="3" fill="none"
                                        strokeLinecap="round" />
                                    <circle cx="75" cy="35" r="3" fill="white" opacity="0.5" />
                                </svg>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:tamzidhuda09@gmail.com">tamzidhuda09@gmail.com</a>
                            </div>
                        </div>
                        <div className="contact-method">
                            <div className="method-icon">
                                <svg width="50" height="50" viewBox="0 0 100 100" className="icon-3d">
                                    <defs>
                                        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <rect x="32" y="12" width="40" height="78" rx="8" fill="url(#phoneGradient)"
                                        opacity="0.2" transform="translate(3, 3)" />
                                    <rect x="30" y="10" width="40" height="78" rx="8" fill="url(#phoneGradient)" />
                                    <rect x="35" y="16" width="30" height="50" rx="2" fill="white" opacity="0.2" />
                                    <circle cx="50" cy="78" r="4" fill="white" opacity="0.8" />
                                    <line x1="42" y1="14" x2="58" y2="14" stroke="white" strokeWidth="2" opacity="0.5"
                                        strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h4>Phone</h4>
                                <a href="https://api.whatsapp.com/send?phone=8801706587805">+880 1706 587805</a>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                        <input type="text" name="from_name" placeholder="Your Name" required />
                        <input type="email" name="from_email" placeholder="Your Email" required />
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={btnStyle}
                        >
                            {btnText}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
