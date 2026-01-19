'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                // Limit to first 4 for display
                setProjects(data.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Work</span>
                    <h2 className="section-title">Featured Projects</h2>
                </div>

                {isLoading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-gray)' }}>Loading data...</p>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-img">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                </div>
                                <div className="project-content">
                                    <div style={{ marginBottom: '0.5rem' }}></div>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    {project.demoLink && (
                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', color: '#6366f1', fontSize: '0.9rem' }}>
                                            Live Demo &rarr;
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href="/projects" className="btn btn-primary">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
