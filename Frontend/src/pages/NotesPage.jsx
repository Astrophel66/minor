import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotesPage = () => {
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
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <p className="text-gray-600">Notes feature coming soon...</p>
        {/* Notes content goes here */}
      </div>
    </div>
  );
};

export default NotesPage;
