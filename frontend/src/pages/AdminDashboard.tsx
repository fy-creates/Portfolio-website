import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDashboard, logout } from '../services/api';
import { LogOut, Users, Eye, MessageSquare, Clock, AlertCircle } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Stats {
  totalViews: number;
  uniqueVisitors: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      const data = await fetchDashboard();
      setMessages(data.messages);
      setStats(data.stats);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg.includes('Unauthorized') || msg.includes('401')) {
        setError('Session expired. Redirecting to login...');
        setTimeout(() => {
          logout();
          navigate('/admin/login');
        }, 2000);
      } else {
        setError(`Failed to load dashboard: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern, not a bug
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-accent animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-surface bg-bg/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display font-bold text-xl">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{error}</p>
              {error.includes('Failed to load') && (
                <p className="mt-1 text-xs opacity-80">
                  Check browser console (F12) for details. If CORS error, wait 2 minutes for backend redeploy.
                </p>
              )}
            </div>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface border border-surface/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Eye size={18} className="text-accent" />
                <span className="text-muted text-sm">Total Views</span>
              </div>
              <p className="font-display font-bold text-3xl text-fg">{stats.totalViews}</p>
            </div>
            <div className="bg-surface border border-surface/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users size={18} className="text-accent" />
                <span className="text-muted text-sm">Unique Visitors</span>
              </div>
              <p className="font-display font-bold text-3xl text-fg">{stats.uniqueVisitors}</p>
            </div>
            <div className="bg-surface border border-surface/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={18} className="text-accent" />
                <span className="text-muted text-sm">Messages</span>
              </div>
              <p className="font-display font-bold text-3xl text-fg">{stats.totalMessages}</p>
            </div>
          </div>
        )}

        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-accent" />
          Contact Messages
        </h2>

        <div className="bg-surface border border-surface/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface/50 text-muted text-left">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted">
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  messages.map((m) => (
                    <tr key={m.id} className="border-b border-surface/30 last:border-0 hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-fg">{m.name}</td>
                      <td className="px-6 py-4 text-muted">{m.email}</td>
                      <td className="px-6 py-4 text-muted max-w-xs truncate">{m.message}</td>
                      <td className="px-6 py-4 text-muted whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
