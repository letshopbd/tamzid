'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedAuth = sessionStorage.getItem('adminAuth');
        if (storedAuth) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsAuthenticated(true);
                sessionStorage.setItem('adminAuth', password);
            } else {
                alert('Invalid password');
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    if (isLoading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h2>
                        <form onSubmit={handleLogin} className="contact-form">
                            <input
                                type="password"
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                        </form>
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <a href="/" style={{ color: 'var(--text-gray)', fontSize: '0.9rem', textDecoration: 'none' }}>&larr; Back to Website</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ marginTop: '50px', flex: 1, paddingBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="section-title" style={{ marginBottom: 0, fontSize: '1.8rem' }}>Admin Panel</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Logged in as Admin</span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
