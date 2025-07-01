import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import CollaboratePage from './pages/CollaboratePage';
import StudyRoomPage from './pages/StudyRoomPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


<ToastContainer position="top-center" autoClose={3000} />

function App() {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
        <Route path="/notes" element={isAuthenticated ? <NotesPage /> : <Navigate to="/login" replace />} />
        <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace />} />
        <Route path="/collaborate" element={isAuthenticated ? <CollaboratePage /> : <Navigate to="/login" replace />} />
        <Route path="/study-room" element={isAuthenticated ? <StudyRoomPage /> : <Navigate to="/login" replace />} />
      </Routes>
  );
}
<ToastContainer position="top-center" autoClose={3000} />
export default App;
