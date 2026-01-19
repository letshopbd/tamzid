'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="container" style={{ marginTop: '100px', flex: 1, paddingBottom: '3rem' }}>
        <h1 className="section-title" style={{ marginBottom: '2rem' }}>All Projects</h1>

        {isLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-gray)' }}>Loading projects...</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <div style={{ marginBottom: '1rem' }}></div>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#6366f1'}
                    onMouseLeave={(e) => e.target.style.color = 'inherit'}
                  >
                    {project.title}
                  </h3>
                  <p>{project.description.substring(0, 100)}...</p>
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}>
                      View Live Demo &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: '#1e293b',
              borderRadius: '1rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              animation: 'scaleIn 0.3s ease-out',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1e293b, transparent)' }}></div>
            </div>

            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>{selectedProject.title}</h2>

              <div style={{ marginBottom: '2rem', color: '#cbd5e1', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {selectedProject.description}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    padding: '0.8rem 1.5rem',
                    background: 'transparent',
                    color: '#cbd5e1',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>

                {selectedProject.demoLink && (
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: '#6366f1',
                      color: 'white',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Live Demo
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
