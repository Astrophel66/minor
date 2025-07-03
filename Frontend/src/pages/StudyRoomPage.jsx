import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, Users, Lock, Globe, Copy, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom, getMyRooms, deleteRoom } from '../services/roomService';
import { startSession } from '../services/sessionService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StudyRoomPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('private');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [myRooms, setMyRooms] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

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
      setMyRooms(rooms);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      toast.error('Failed to load rooms');
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    try {
      const room = await createRoom(roomName, roomType);
      setRoomCode(room.code);
      toast.success(`Room "${room.name}" created successfully`);
      await refreshRooms();
    } catch (err) {
      console.error('Error creating room:', err);
      toast.error(err.response?.data?.error || 'Failed to create room');
    }
  };

  const handleJoinRoom = async () => {
  try {
    if (joinCode.trim()) {
      const room = await joinRoom(joinCode);
      setJoinCode('');
      toast.success(`Joined room: ${room.name}`);

      navigate('/join-success', { state: { roomName: room.name, roomCode: room.code } });
    }
  } catch (err) {
    console.error('Error joining room:', err);
    toast.error(err.response?.data?.error || 'Failed to join room. Check code and try again.');
  }
};


  const handleStartPomodoroSession = async (roomId) => {
    try {
      const now = new Date();
      const later = new Date(now.getTime() + 25 * 60 * 1000);
      await startSession(now.toISOString(), later.toISOString(), 25);
      toast.success('Pomodoro session started');
    } catch (err) {
      console.error(err);
      toast.error('Failed to start session');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await deleteRoom(roomId);
      toast.success('Room deleted successfully');
      await refreshRooms();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to delete room');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    toast.success('Room code copied');
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const filteredRooms = myRooms.filter(room => {
    if (filterType === 'all') return true;
    return room.type === filterType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900">My Study Rooms</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Room</span>
          </button>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="all">All Rooms</option>
            <option value="public">Public Rooms</option>
            <option value="private">Private Rooms</option>
          </select>
        </div>

        {filteredRooms.length === 0 ? (
          <p className="text-gray-600">No rooms found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 p-4 rounded-lg bg-white shadow hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${room.type === 'public' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                    {room.type === 'public' ? 'Public' : 'Private'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Code: {room.code}</span>
                  <button
                    onClick={() => copyToClipboard(room.code)}
                    className="text-amber-600 hover:text-amber-700"
                    title="Copy Code"
                  >
                    {copiedCode === room.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
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
                    Pomodoro
                  </button>
                  {room.creatorId === user?.id && (
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                      title="Delete Room"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
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
                    setRoomType('private');
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
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setRoomName('');
                      setRoomType('private');
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
