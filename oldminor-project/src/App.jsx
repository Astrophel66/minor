import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import CollaboratePage from './pages/CollaboratePage';
import StudyRoomPage from './pages/StudyRoomPage';

function App() {
  // Mock authentication state - in real app this would come from context/state management
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          } />
          <Route path="/notes" element={
            isAuthenticated ? <NotesPage /> : <Navigate to="/login" />
          } />
          <Route path="/tasks" element={
            isAuthenticated ? <TasksPage /> : <Navigate to="/login" />
          } />
          <Route path="/collaborate" element={
            isAuthenticated ? <CollaboratePage /> : <Navigate to="/login" />
          } />
          <Route path="/study-room" element={
            isAuthenticated ? <StudyRoomPage /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;