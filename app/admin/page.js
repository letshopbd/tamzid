import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-welcome" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Welcome back, Admin
                </h2>
                <p style={{ color: 'var(--text-gray)', fontSize: '1.2rem' }}>What would you like to manage today?</p>
            </div>

            <div className="admin-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {/* Projects Module Card */}
                <Link href="/admin/projects" style={{ textDecoration: 'none' }}>
                    <div className="admin-card" style={{
                        background: 'var(--card-bg)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            color: '#6366f1'
                        }}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Manage Projects</h3>
                        <p style={{ color: 'var(--text-gray)' }}>Add, edit, or remove projects from your portfolio showcase.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            Open Projects
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* Placeholder for future modules */}
                <div className="admin-card" style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    opacity: 0.6,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'not-allowed'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255,255,255, 0.05)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        color: 'var(--text-gray)'
                    }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </div>
                    <h3 style={{ color: 'var(--text-gray)', marginBottom: '0.5rem' }}>Add More</h3>
                    <p style={{ color: 'var(--text-gray)' }}>More management tools can be added here in the future.</p>
                </div>
            </div>
        </div>
    );
}
