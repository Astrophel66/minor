import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Clock, Users, Target, Award } from 'lucide-react';

const DashboardPage = () => {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const { token, userId, logout } = useAuth();

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUsername(data.username))
      .catch(err => {
        console.error('Auth failed:', err);
        logout();
        navigate('/login');
      });

    fetch(`http://localhost:5000/api/users/dashboard-stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setStats([
          { title: 'Study Hours', value: data.studyHours, icon: Clock, color: 'amber' },
          { title: 'Active Rooms', value: data.activeRooms, icon: Users, color: 'teal' },
          { title: 'Goals Met', value: data.goalsMet, icon: Target, color: 'emerald' },
          { title: 'Streak Days', value: data.streakDays, icon: Award, color: 'orange' }
        ]);
      })
      .catch(err => {
        console.error('Auth failed:', err);
        logout();
        navigate('/login');
      });

  }, [token, userId, navigate, logout]);

  const colorClasses = {
    amber: 'from-amber-500 to-amber-600',
    teal: 'from-teal-500 to-teal-600',
    emerald: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-amber-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome back, {username || '...'}!
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
