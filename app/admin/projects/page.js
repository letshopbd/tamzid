'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Toast from '@/components/Toast';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Text fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // File states
  const [imageFile, setImageFile] = useState(null);
  const [siteFiles, setSiteFiles] = useState([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);

  const [editId, setEditId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  // Refs
  const imageInputRef = useRef(null);
  const siteInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
      showToast('Failed to load projects', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const traverseFileTree = async (item, path = '') => {
    if (item.isFile) {
      const file = await new Promise((resolve) => item.file(resolve));
      return [{ file, path: path + file.name }];
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      const entries = await new Promise((resolve) => {
        dirReader.readEntries(resolve);
      });

      let files = [];
      for (const entry of entries) {
        files = files.concat(await traverseFileTree(entry, path + item.name + '/'));
      }
      return files;
    }
    return [];
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setIsProcessingFiles(true);

    try {
      const items = e.dataTransfer.items;
      if (!items) return;

      let allFiles = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
          allFiles = allFiles.concat(await traverseFileTree(item));
        } else {
          if (items[i].kind === 'file') {
            const f = items[i].getAsFile();
            allFiles.push({ file: f, path: f.name });
          }
        }
      }
      setSiteFiles(prev => [...prev, ...allFiles]);
      if (allFiles.length > 0) showToast(`${allFiles.length} files added!`);
    } catch (error) {
      console.error("Error processing dropped files:", error);
      showToast("Failed to process files", 'error');
    } finally {
      setIsProcessingFiles(false);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(f => ({
        file: f,
        path: f.webkitRelativePath || f.name
      }));
      setSiteFiles(prev => [...prev, ...selectedFiles]);
      if (selectedFiles.length > 0) showToast(`${selectedFiles.length} files added!`);
    }
  };

  const removeFile = (index) => {
    setSiteFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getAuthHeader = () => {
    return sessionStorage.getItem('adminAuth') || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuthHeader();

    if (!editId && (!imageFile || siteFiles.length === 0)) {
      showToast("Please upload a cover image and project files.", 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (imageFile) formData.append('imageFile', imageFile);

    siteFiles.forEach(({ file, path }) => {
      formData.append('siteFiles', file);
      formData.append('filePaths', path);
    });

    try {
      if (editId) {
        formData.append('id', editId);
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Authorization': auth },
          body: formData
        });
        if (res.ok) {
          showToast('Project updated successfully!');
          resetForm();
          fetchProjects();
        } else {
          const err = await res.json();
          showToast('Failed: ' + (err.error || 'Unknown error'), 'error');
        }
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Authorization': auth },
          body: formData
        });
        if (res.ok) {
          showToast('Project created successfully!');
          resetForm();
          fetchProjects();
        } else {
          const err = await res.json();
          showToast('Failed: ' + (err.error || 'Unknown error'), 'error');
        }
      }
    } catch (error) {
      console.error('Operation failed', error);
      showToast('Operation failed', 'error');
    }
  };

  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setSiteFiles([]);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (siteInputRef.current) siteInputRef.current.value = "";
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImageFile(null);
    setSiteFiles([]);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (siteInputRef.current) siteInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Editing "${project.title}"`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const auth = getAuthHeader();
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': auth }
      });
      if (res.ok) {
        showToast('Project deleted successfully!');
        fetchProjects();
      } else {
        showToast('Failed to delete.', 'error');
      }
    } catch (e) {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/admin" style={{ color: 'var(--text-gray)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Dashboard
          </Link>
          <h2 className="section-title" style={{ fontSize: '2.5rem', margin: 0 }}>Manage Projects</h2>
        </div>
      </div>

      <div style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(20px)',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        marginBottom: '4rem',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {editId ? 'Edit Project' : 'Add New Project'}
          </h3>
          <p style={{ color: 'var(--text-gray)' }}>
            Upload your project files directly. We handle the hosting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form" style={{ gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)' }}>Project Title</label>
            <input
              type="text"
              placeholder="e.g., Personal Portfolio Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)' }}>Cover Image</label>
              <div
                onClick={() => imageInputRef.current.click()}
                style={{
                  border: '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: '0.8rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s',
                  height: '100%'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required={!editId}
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                />
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ marginBottom: '0.5rem' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{ fontSize: '0.9rem', color: imageFile ? 'var(--primary)' : 'var(--text-gray)' }}>
                  {imageFile ? imageFile.name : 'Click to Select Image'}
                </p>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)' }}>Project Source Code</label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => siteInputRef.current && siteInputRef.current.click()}
                style={{
                  border: dragActive ? '2px dashed var(--primary)' : '2px dashed rgba(255,255,255,0.2)',
                  padding: '2rem',
                  textAlign: 'center',
                  borderRadius: '0.8rem',
                  cursor: 'pointer',
                  background: dragActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '150px'
                }}
              >
                <input
                  type="file"
                  multiple
                  ref={siteInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                {isProcessingFiles ? (
                  <div className="wave-icon">⏳ Processing...</div>
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ marginBottom: '1rem' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p style={{ pointerEvents: 'none', margin: 0 }}>
                      Drag & Drop your <strong>Project Folder</strong> here
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.5rem' }}>
                      or <span style={{ color: 'var(--primary)', textDecoration: 'underline' }}>browse files</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* File Statistics */}
          {siteFiles.length > 0 && (
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>STAGED FILES ({siteFiles.length})</span>
                <button type="button" onClick={() => setSiteFiles([])} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>Clear All</button>
              </div>
              <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {siteFiles.slice(0, 50).map(({ path }, index) => (
                  <div key={index} style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.3rem',
                    fontSize: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    color: 'var(--text-light)'
                  }}>
                    <span>{path}</span>
                  </div>
                ))}
                {siteFiles.length > 50 && <span style={{ padding: '0.2rem', fontSize: '0.8rem', color: 'var(--text-gray)' }}>...and {siteFiles.length - 50} more</span>}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)' }}>Description</label>
            <textarea
              placeholder="Describe your project, technologies used, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              style={{ width: '100%', fontSize: '1rem', padding: '1rem', lineHeight: '1.6' }}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={isProcessingFiles} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              {editId ? 'Save Changes' : 'Create Project'}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm} style={{ padding: '1rem 2rem' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Existing Projects</h3>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--card-bg)', borderRadius: '2rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
          Total: {projects.length}
        </div>
      </div>

      <div className="projects-grid" style={{ gap: '2rem' }}>
        {projects.map(project => (
          <div key={project.id} className="project-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="project-img" style={{ height: '200px' }}>
              <img src={project.image} alt={project.title} style={{ transition: 'transform 0.5s ease' }} />
            </div>
            <div className="project-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>{project.description}</p>

              {project.demoLink && (
                <div style={{ marginBottom: '1.5rem', padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 700 }}>Live Link</div>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {project.demoLink.split('/').pop()}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
              )}

              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.8rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => handleEdit(project)} className="btn btn-secondary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', justifyContent: 'center' }}>Edit</button>
                <button onClick={() => handleDelete(project.id)} className="btn" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', justifyContent: 'center' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
