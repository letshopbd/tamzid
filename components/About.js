export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Get To Know Me</span>
                    <h2 className="section-title">About Me</h2>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>I'm a passionate student specializing in AI and Web Development. I leverage cutting-edge AI tools
                            to create innovative web solutions and effective digital marketing strategies.</p>
                        <div className="highlights">
                            <div className="highlight">
                                <div className="highlight-icon">
                                    <svg width="40" height="40" viewBox="0 0 100 100" className="icon-animated">
                                        <defs>
                                            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <rect x="25" y="30" width="50" height="45" rx="8" fill="url(#aiGradient)"
                                            opacity="0.2" transform="translate(2, 2)" />
                                        <rect x="25" y="30" width="50" height="45" rx="8" fill="url(#aiGradient)" />
                                        <circle cx="42" cy="48" r="5" fill="white" />
                                        <circle cx="58" cy="48" r="5" fill="white" />
                                        <rect x="40" y="60" width="20" height="4" rx="2" fill="white" opacity="0.8" />
                                        <rect x="35" y="20" width="8" height="12" rx="4" fill="url(#aiGradient)" />
                                        <rect x="57" y="20" width="8" height="12" rx="4" fill="url(#aiGradient)" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>AI Enthusiast</h4>
                                    <p>Exploring AI-powered solutions</p>
                                </div>
                            </div>
                            <div className="highlight">
                                <div className="highlight-icon">
                                    <svg width="40" height="40" viewBox="0 0 100 100" className="icon-animated">
                                        <defs>
                                            <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <rect x="15" y="25" width="70" height="45" rx="4" fill="url(#webGradient)"
                                            opacity="0.2" transform="translate(2, 2)" />
                                        <rect x="15" y="25" width="70" height="45" rx="4" fill="url(#webGradient)" />
                                        <rect x="20" y="30" width="60" height="32" rx="2" fill="#1e293b" />
                                        <rect x="40" y="70" width="20" height="3" rx="1.5" fill="url(#webGradient)" />
                                        <path d="M 35 45 L 40 50 L 35 55" stroke="#3b82f6" strokeWidth="2" fill="none"
                                            strokeLinecap="round" />
                                        <line x1="50" y1="45" x2="50" y2="55" stroke="#3b82f6" strokeWidth="2"
                                            strokeLinecap="round" />
                                        <path d="M 65 45 L 60 50 L 65 55" stroke="#3b82f6" strokeWidth="2" fill="none"
                                            strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Web Development with AI</h4>
                                    <p>Building smart web applications</p>
                                </div>
                            </div>
                            <div className="highlight">
                                <div className="highlight-icon">
                                    <svg width="40" height="40" viewBox="0 0 100 100" className="icon-animated">
                                        <defs>
                                            <linearGradient id="marketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <rect x="20" y="20" width="60" height="60" rx="4" fill="url(#marketGradient)"
                                            opacity="0.2" transform="translate(2, 2)" />
                                        <rect x="20" y="20" width="60" height="60" rx="4" fill="url(#marketGradient)" />
                                        <polyline points="30,60 40,50 50,55 60,40 70,35" stroke="white" strokeWidth="3"
                                            fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="30" cy="60" r="3" fill="white" />
                                        <circle cx="40" cy="50" r="3" fill="white" />
                                        <circle cx="50" cy="55" r="3" fill="white" />
                                        <circle cx="60" cy="40" r="3" fill="white" />
                                        <circle cx="70" cy="35" r="3" fill="white" />
                                        <path d="M 65 30 L 70 35 L 65 40" fill="white" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Digital Marketing</h4>
                                    <p>Data-driven marketing strategies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
