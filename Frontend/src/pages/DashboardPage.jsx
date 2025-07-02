import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Clock, Users, Target, Award } from 'lucide-react';
import { toast } from 'react-toastify';
import { getUserProfile, getDashboardStats } from '../services/userService';

const DashboardPage = () => {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading, logout } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userData = await getUserProfile(user.id);
        setUsername(userData.username);

        const statsData = await getDashboardStats();

        setStats([
          { title: 'Study Hours', value: statsData.studyHours || 0, icon: Clock, color: 'amber' },
          { title: 'Active Rooms', value: statsData.activeRooms || 0, icon: Users, color: 'teal' },
          { title: 'Goals Met', value: statsData.goalsMet || 0, icon: Target, color: 'emerald' },
          { title: 'Streak Days', value: statsData.streakDays || 0, icon: Award, color: 'orange' },
        ]);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error('Session expired or failed to load dashboard. Please log in again.');
        logout();
        navigate('/login');
      }
    };

    fetchData();
  }, [isAuthenticated, user, authLoading, navigate, logout]);

  const colorClasses = {
    amber: 'from-amber-500 to-amber-600',
    teal: 'from-teal-500 to-teal-600',
    emerald: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-amber-600',
  };

  if (authLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, {username || '...'}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-4 bg-gradient-to-r ${colorClasses[stat.color]} text-white rounded-lg shadow-md`}>
                <div className="flex items-center space-x-4">
                  <Icon className="w-8 h-8" />
                  <div>
                    <h2 className="text-lg font-semibold">{stat.title}</h2>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
