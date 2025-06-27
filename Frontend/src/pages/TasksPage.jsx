import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const TasksPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        <p className="text-gray-600">Task management coming soon...</p>
        {/* Tasks content goes here */}
      </div>
    </div>
  );
};

export default TasksPage;
