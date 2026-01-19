export default function Skills() {
    return (
        <section className="skills" id="skills">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Expertise</span>
                    <h2 className="section-title">Skills & Technologies</h2>
                </div>
                <div className="skills-grid">
                    <div className="skill-category">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 100 100" className="skill-icon"
                                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                                <defs>
                                    <linearGradient id="aiSkillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <rect x="25" y="30" width="50" height="45" rx="8" fill="url(#aiSkillGradient)" />
                                <circle cx="42" cy="48" r="5" fill="white" />
                                <circle cx="58" cy="48" r="5" fill="white" />
                                <rect x="40" y="60" width="20" height="4" rx="2" fill="white" opacity="0.8" />
                            </svg>
                            AI & Machine Learning
                        </h3>
                        <div className="skill-items">
                            <div className="skill-item">
                                <span>ChatGPT & AI Tools</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '80%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>AI-Powered Development</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '75%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>Prompt Engineering</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '70%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 100 100" className="skill-icon"
                                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                                <defs>
                                    <linearGradient id="webSkillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <rect x="15" y="25" width="70" height="45" rx="4" fill="url(#webSkillGradient)" />
                                <rect x="20" y="30" width="60" height="32" rx="2" fill="#1e293b" />
                                <path d="M 35 45 L 40 50 L 35 55" stroke="#3b82f6" strokeWidth="2" fill="none" />
                            </svg>
                            Web Development with AI
                        </h3>
                        <div className="skill-items">
                            <div className="skill-item">
                                <span>HTML, CSS, JavaScript</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '88%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>React & Next.js</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '85%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>UI/UX Design</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '87%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 100 100" className="skill-icon"
                                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                                <defs>
                                    <linearGradient id="marketSkillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <rect x="20" y="20" width="60" height="60" rx="4" fill="url(#marketSkillGradient)" />
                                <polyline points="30,60 40,50 50,55 60,40 70,35" stroke="white" strokeWidth="3"
                                    fill="none" />
                                <circle cx="70" cy="35" r="3" fill="white" />
                            </svg>
                            Digital Marketing
                        </h3>
                        <div className="skill-items">
                            <div className="skill-item">
                                <span>SEO & Content Strategy</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '25%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>Social Media Marketing</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '30%' }}></div>
                                </div>
                            </div>
                            <div className="skill-item">
                                <span>Analytics & Insights</span>
                                <div className="skill-bar">
                                    <div className="skill-progress" style={{ '--width': '20%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
