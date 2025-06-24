import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Plus, 
  Users, 
  Lock, 
  Globe, 
  Clock,
  BookOpen,
  Coffee,
  Zap,
  Eye,
  Copy,
  Check
} from 'lucide-react';

const StudyRoomPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roomType, setRoomType] = useState('public');
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const publicRooms = [
    {
      id: 1,
      name: 'Advanced Calculus Study Group',
      topic: 'Integration Techniques',
      members: 12,
      maxMembers: 20,
      host: 'Sarah Chen',
      time: '2 hours',
      category: 'Mathematics',
      difficulty: 'Advanced',
      isActive: true
    },
    {
      id: 2,
      name: 'Chemistry Lab Prep',
      topic: 'Organic Reactions',
      members: 8,
      maxMembers: 15,
      host: 'Mike Rodriguez',
      time: '45 min',
      category: 'Chemistry',
      difficulty: 'Intermediate',
      isActive: true
    },
    {
      id: 3,
      name: 'History Research Group',
      topic: 'World War II Timeline',
      members: 6,
      maxMembers: 10,
      host: 'Emma Thompson',
      time: '3 hours',
      category: 'History',
      difficulty: 'Beginner',
      isActive: true
    },
    {
      id: 4,
      name: 'Programming Fundamentals',
      topic: 'Data Structures & Algorithms',
      members: 15,
      maxMembers: 25,
      host: 'Alex Kim',
      time: '1 hour',
      category: 'Computer Science',
      difficulty: 'Intermediate',
      isActive: true
    },
    {
      id: 5,
      name: 'Physics Problem Solving',
      topic: 'Thermodynamics',
      members: 4,
      maxMembers: 12,
      host: 'Jessica Park',
      time: '30 min',
      category: 'Physics',
      difficulty: 'Advanced',
      isActive: false
    }
  ];

  const categoryColors = {
    'Mathematics': 'bg-amber-100 text-amber-800',
    'Chemistry': 'bg-emerald-100 text-emerald-800',
    'History': 'bg-yellow-100 text-yellow-800',
    'Computer Science': 'bg-teal-100 text-teal-800',
    'Physics': 'bg-red-100 text-red-800'
  };

  const difficultyColors = {
    'Beginner': 'bg-emerald-100 text-emerald-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      if (roomType === 'private') {
        // Generate a random room code
        const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomCode(generatedCode);
      }
      // In a real app, this would create the room in the backend
      console.log('Creating room:', { name: roomName, type: roomType, code: roomCode });
      // Reset form but keep modal open to show the code
    }
  };

  const handleJoinRoom = (roomId) => {
    if (roomId) {
      // Join public room
      console.log('Joining public room:', roomId);
    } else if (joinCode.trim()) {
      // Join private room with code
      console.log('Joining private room with code:', joinCode);
      setJoinCode('');
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Rooms</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create or join focused study spaces with your peers. Collaborate in real-time and boost your productivity.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            <span>Create Study Room</span>
          </button>
        </div>

        {/* Join Private Room */}
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
              onClick={() => handleJoinRoom()}
              disabled={!joinCode.trim()}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join
            </button>
          </div>
        </div>

        {/* Public Rooms */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-900">Public Study Rooms</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{room.topic}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${room.isActive ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[room.category]}`}>
                    {room.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[room.difficulty]}`}>
                    {room.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{room.members}/{room.maxMembers} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{room.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Hosted by {room.host}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    disabled={room.members >= room.maxMembers}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {room.members >= room.maxMembers ? 'Full' : 'Join Room'}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-2">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
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

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Study Room</h2>
            
            {roomCode ? (
              // Show room code after creation
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
                    <span className="text-2xl font-mono font-bold text-amber-600 tracking-wider">
                      {roomCode}
                    </span>
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
                  <button
                    onClick={() => handleJoinRoom()}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all"
                  >
                    Enter Room
                  </button>
                </div>
              </div>
            ) : (
              // Room creation form
              <form onSubmit={handleCreateRoom} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter room name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Room Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRoomType('public')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        roomType === 'public'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Globe className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-medium text-gray-900">Public</p>
                      <p className="text-sm text-gray-600">Anyone can join</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoomType('private')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        roomType === 'private'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Lock className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                      <p className="font-medium text-gray-900">Private</p>
                      <p className="text-sm text-gray-600">Code required</p>
                    </button>
                  </div>
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