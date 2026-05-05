import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RequireAdmin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, user, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">MindBrain Admin</p>
          <p className="mt-3 text-lg font-semibold">Checking your access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center shadow-2xl shadow-red-950/30">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-300" />
          <h1 className="mt-4 text-2xl font-semibold">Admin access required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            This panel is only available for users with the admin role on your backend.
            <br />
            Redirecting to home page in 3 seconds...
          </p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-100"
          >
            Return to website
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default RequireAdmin;
