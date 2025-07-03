import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function JoinRoomSuccessPage({ roomName, roomCode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">You've successfully joined!</h1>

        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold text-gray-800">{roomName}</span>. Share the code with others to invite them.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
          <p className="text-gray-700 mb-2">Room Code:</p>
          <p className="text-xl font-mono text-amber-600">{roomCode}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate(`/room/${roomCode}`)}
            className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-amber-700 hover:to-teal-700"
          >
            Enter Room
          </button>

          <button
            onClick={() => navigate('/study-room')}
            className="border border-gray-300 px-6 py-2 rounded-lg"
          >
            Back to My Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
