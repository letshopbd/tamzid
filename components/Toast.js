'use client';

import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Allow animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!message) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            {type === 'success' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            )}
            <span style={{ fontWeight: 500 }}>{message}</span>
        </div>
    );
}
