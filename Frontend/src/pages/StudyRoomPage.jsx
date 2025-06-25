import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  Plus,
  Users,
  Lock,
  Globe,
  BookOpen,
  Coffee,
  Zap,
  Copy,
  Check
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { createRoom as createRoomAPI, joinRoom as joinRoomAPI, getMyRooms } from '../services/room';
import { startSession } from '../services/sessionService';

const StudyRoomPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roomType, setRoomType] = useState('public');
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [myRooms, setMyRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    refreshRooms();
  }, []);

  const refreshRooms = async () => {
    try {
      const rooms = await getMyRooms();
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
      const room = await createRoomAPI(roomName);
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
        const room = await joinRoomAPI(joinCode);
        console.log('Joined private room:', room);
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
      const later = new Date(now.getTime() + 25 * 60 * 1000); // 25-minute Pomodoro

      const newSession = await startSession(
        now.toISOString(),
        later.toISOString(),
        25
      );

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Study Rooms</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create or join focused study spaces with your peers. Collaborate in real-time and boost your productivity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            <span>Create Study Room</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gray-600" />
            <span>Join Private Room</span>
          </h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono tracking-wider"
              maxLength={6}
            />
            <button
              onClick={handleJoinRoom}
              disabled={!joinCode.trim()}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-900">My Study Rooms</h2>
          </div>

          {myRooms.length === 0 ? (
            <p className="text-gray-600">You have no study rooms yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{room.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">Room Code: {room.code}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/room/${room.id}`)}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all text-sm"
                    >
                      Enter Room
                    </button>
                    <button
                      onClick={() => handleStartPomodoroSession(room.id)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
                    >
                      Start Pomodoro
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-teal-100">Active Users</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <Coffee className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-emerald-100">Active Rooms</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">240</p>
                <p className="text-amber-100">Study Hours Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Study Room</h2>

            {roomCode ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Room Created!</h3>
                  <p className="text-gray-600">Share this code with your study partners:</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-amber-600 tracking-wider">{roomCode}</span>
                    <button
                      onClick={() => copyToClipboard(roomCode)}
                      className="text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      {copiedCode === roomCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setRoomCode('');
                      setRoomName('');
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateRoom} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter room name..."
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setRoomName('');
                      setRoomCode('');
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all"
                  >
                    Create Room
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
