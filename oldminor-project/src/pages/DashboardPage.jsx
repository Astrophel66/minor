import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  TrendingUp,
  Clock,
  Users,
  Target,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';

const DashboardPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const stats = [
    { title: 'Study Hours', value: '142', change: '+12%', icon: Clock, color: 'amber' },
    { title: 'Active Rooms', value: '8', change: '+3', icon: Users, color: 'teal' },
    { title: 'Goals Met', value: '24', change: '+8', icon: Target, color: 'emerald' },
    { title: 'Streak Days', value: '15', change: 'Record!', icon: Award, color: 'orange' },
  ];

  const recentActivity = [
    { action: 'Joined "Advanced Calculus" study room', time: '2 hours ago' },
    { action: 'Completed "Physics Chapter 8" notes', time: '4 hours ago' },
    { action: 'Started collaborative session with Sarah', time: '6 hours ago' },
    { action: 'Added 5 new tasks to "Midterm Prep"', time: '1 day ago' },
  ];

  const upcomingEvents = [
    { title: 'Math Study Group', time: 'Today, 3:00 PM', participants: 4 },
    { title: 'History Project Review', time: 'Tomorrow, 10:00 AM', participants: 2 },
    { title: 'Chemistry Lab Prep', time: 'Wed, 2:00 PM', participants: 6 },
  ];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user details');
        return res.json();
      })
      .then(data => {
        setUsername(data.username);
      })
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {username || '...'}! 👋
          </h1>
          <p className="text-gray-600">
            "The expert in anything was once a beginner." - Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              amber: 'from-amber-500 to-amber-600',
              teal: 'from-teal-500 to-teal-600',
              emerald: 'from-emerald-500 to-emerald-600',
              orange: 'from-orange-500 to-orange-600',
            };

            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                  </div>
                </div>
                <h3 className="text-gray-600 font-medium">{stat.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
                  View all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-amber-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02]">
                  Create Study Room
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Join Room
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Add Note
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.time}</p>
                    <div className="flex items-center mt-2">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{event.participants} participants</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Study Streak</h3>
              </div>
              <div className="text-3xl font-bold mb-2">15 Days</div>
              <p className="text-amber-100 text-sm">You're on fire! Keep up the great work.</p>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
              <p className="text-xs text-amber-100 mt-2">5 days to next milestone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
