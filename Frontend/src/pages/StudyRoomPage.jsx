import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, Users, Lock, Globe, Coffee, Zap, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom, getMyRooms } from '../services/room';
import { startSession } from '../services/sessionService';
import { useAuth } from '../context/AuthContext';

const StudyRoomPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [myRooms, setMyRooms] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    refreshRooms();
  }, [isAuthenticated]);

  const refreshRooms = async () => {
    try {
      const rooms = await getMyRooms();
      console.log('✅ Rooms fetched:', rooms);
      setMyRooms(rooms);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      alert('Failed to load rooms');
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    try {
      const room = await createRoom(roomName);
      setRoomCode(room.code);
      console.log('Room created:', room);
      await refreshRooms();
    } catch (err) {
      console.error('Error creating room:', err);
      alert('Failed to create room');
    }
  };

  const handleJoinRoom = async () => {
    try {
      if (joinCode.trim()) {
        const room = await joinRoom(joinCode);
        console.log('Joined room:', room);
        setJoinCode('');
        alert(`Joined room: ${room.name}`);
        await refreshRooms();
      }
    } catch (err) {
      console.error('Error joining room:', err);
      alert('Failed to join room. Check code and try again.');
    }
  };

  const handleStartPomodoroSession = async (roomId) => {
    try {
      const now = new Date();
      const later = new Date(now.getTime() + 25 * 60 * 1000);
      const newSession = await startSession(now.toISOString(), later.toISOString(), 25);
      console.log('Pomodoro Session started:', newSession);
      alert(`Pomodoro session started in room ID: ${roomId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to start session');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Study Rooms</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Room</span>
          </button>
        </div>

        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Enter Room Code"
            maxLength={6}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleJoinRoom}
            disabled={!joinCode.trim()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            Join Room
          </button>
        </div>

        {myRooms.length === 0 ? (
          <p className="text-gray-600">You have no study rooms yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-gray-900">{room.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Room Code: {room.code}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/room/${room.id}`)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-1 rounded-lg text-sm hover:from-amber-700 hover:to-teal-700"
                  >
                    Enter
                  </button>
                  <button
                    onClick={() => handleStartPomodoroSession(room.id)}
                    className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700"
                  >
                    Start Pomodoro
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Create Study Room</h2>
            {roomCode ? (
              <div className="text-center space-y-4">
                <p className="text-gray-700">Room Created! Share this code:</p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-2xl font-bold text-amber-600">{roomCode}</span>
                  <button onClick={() => copyToClipboard(roomCode)}>
                    {copiedCode === roomCode ? <Check /> : <Copy />}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setRoomName('');
                    setRoomCode('');
                  }}
                  className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Room Name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setRoomName('');
                    }}
                    className="flex-1 border border-gray-300 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-2 rounded-lg hover:from-amber-700 hover:to-teal-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoomPage;
