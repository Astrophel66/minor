import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, Users, Lock, Globe, Copy, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom, getMyRooms, deleteRoom } from '../services/roomService';
import { startSession, getMySessions } from '../services/sessionService';
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
  const [sessionHistory, setSessionHistory] = useState([]);

  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [durationModal, setDurationModal] = useState({ open: false, roomId: null });
  const [pomodoroDuration, setPomodoroDuration] = useState(1);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    refreshRooms();
    fetchSessionHistory();
  }, [isAuthenticated]);

  useEffect(() => {
    const savedTimer = JSON.parse(localStorage.getItem('pomodoroTimer'));
    if (savedTimer && savedTimer.expiry && Date.now() < savedTimer.expiry) {
      const remaining = Math.floor((savedTimer.expiry - Date.now()) / 1000);
      setTimer(remaining);
      setIsTimerRunning(true);
      setActiveRoomId(savedTimer.roomId);
    } else {
      localStorage.removeItem('pomodoroTimer');
    }
  }, []);

  useEffect(() => {
    if (!isTimerRunning) return;

    if (timer <= 0) {
      setIsTimerRunning(false);
      setActiveRoomId(null);
      localStorage.removeItem('pomodoroTimer');
      toast.info('Pomodoro session ended!');
      fetchSessionHistory();
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  const refreshRooms = async () => {
    try {
      const rooms = await getMyRooms();
      setMyRooms(rooms);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      toast.error('Failed to load rooms');
    }
  };

  const fetchSessionHistory = async () => {
    try {
      const sessions = await getMySessions();
      setSessionHistory(sessions);
    } catch (err) {
      console.error('Error fetching history:', err);
      toast.error('Failed to load history');
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

  const handleStartPomodoroSession = async () => {
    try {
      const now = new Date();
      const later = new Date(now.getTime() + pomodoroDuration * 60 * 1000);

      await startSession({
        startTime: now.toISOString(),
        endTime: later.toISOString(),
        duration: pomodoroDuration,
        roomId: durationModal.roomId,
      });

      const expiry = later.getTime();
      localStorage.setItem('pomodoroTimer', JSON.stringify({ expiry, roomId: durationModal.roomId }));

      setActiveRoomId(durationModal.roomId);
      setTimer(pomodoroDuration * 60);
      setIsTimerRunning(true);
      setDurationModal({ open: false, roomId: null });

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

  const filteredRooms = myRooms.filter((room) =>
    filterType === 'all' ? true : room.type === filterType
  );

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Room Display */}
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
              <div key={room.id} className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${room.type === 'public' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                    {room.type === 'public' ? 'Public' : 'Private'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Code: {room.code}</span>
                  <button onClick={() => copyToClipboard(room.code)} className="text-amber-600 hover:text-amber-700">
                    {copiedCode === room.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {activeRoomId === room.id && isTimerRunning && (
                  <div className="mb-2 font-mono text-lg text-emerald-700">
                    Pomodoro: {formatTime(timer)}
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/room/${room.id}`)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-1 rounded-lg text-sm hover:from-amber-700 hover:to-teal-700"
                  >
                    Enter
                  </button>
                  <button
                    onClick={() => setDurationModal({ open: true, roomId: room.id })}
                    className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700"
                  >
                    Pomodoro
                  </button>
                  {room.creatorId === user?.id && (
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pomodoro History */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Pomodoro History</h2>
          {sessionHistory.length === 0 ? (
            <p className="text-gray-500">No sessions yet.</p>
          ) : (
            <ul className="space-y-2">
              {[...sessionHistory].reverse().map((s) => (
                <li key={s.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-600 font-semibold text-lg">{s.duration} min</span>
                    <span className="text-gray-500 text-xs font-mono">Room ID: {s.RoomId}</span>
                  </div>
                  <div className="text-gray-700 text-sm space-y-1">
                    <div><strong>Start:</strong> {new Date(s.startTime).toLocaleTimeString()}</div>
                    <div><strong>End:</strong> {new Date(s.endTime).toLocaleTimeString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
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

      {/* Pomodoro Duration Modal */}
      {durationModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
            <h2 className="text-lg font-bold">Pomodoro Duration (minutes)</h2>
            <input
              type="number"
              min={1}
              max={60}
              value={pomodoroDuration}
              onChange={(e) => setPomodoroDuration(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDurationModal({ open: false, roomId: null })}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleStartPomodoroSession}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoomPage;
