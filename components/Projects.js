export default function Projects() {
    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Work</span>
                    <h2 className="section-title">Featured Projects</h2>
                </div>
                <div className="projects-grid">
                    <div className="project-card">
                        <div className="project-img">
                            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
                                alt="AI Project" />
                        </div>
                        <div className="project-content">
                            <div className="tags">
                                <span>AI</span>
                                <span>Web App</span>
                            </div>
                            <h3>AI-Powered Web Application</h3>
                            <p>Smart web app using AI for enhanced user experience</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="project-img">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                                alt="Marketing Project" />
                        </div>
                        <div className="project-content">
                            <div className="tags">
                                <span>Marketing</span>
                                <span>Analytics</span>
                            </div>
                            <h3>Digital Marketing Campaign</h3>
                            <p>Data-driven campaign with measurable results</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
