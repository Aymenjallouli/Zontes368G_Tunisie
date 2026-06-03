import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', height: '100vh',
        alignItems: 'center', justifyContent: 'center',
        background: '#0c0c0e', color: '#bb9a5e',
        fontFamily: 'Saira, sans-serif', letterSpacing: '0.2em', fontSize: 13,
      }}>
        CHARGEMENT...
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
