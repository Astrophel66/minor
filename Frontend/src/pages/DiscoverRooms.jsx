import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getPublicRooms, joinRoom } from '../services/roomService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Users, Search, Filter, Globe, CheckCircle } from 'lucide-react';

const generateMockAvatars = (count) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    color: colors[i % colors.length],
    initials: `U${i + 1}`
  }));
};

export default function DiscoverRoom() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [joiningRoomId, setJoiningRoomId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getPublicRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load public rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'small' && room.participantCount < 5) ||
      (filterType === 'large' && room.participantCount >= 5);

    return matchesSearch && matchesFilter;
  });

  const handleJoin = async (code, name) => {
    try {
      setJoiningRoomId(code);
      const room = await joinRoom(code);
      toast.success(`Joined room: ${room.name}`);
      navigate('/join-success', { state: { roomName: room.name, roomCode: room.code } });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to join room');
    } finally {
      setJoiningRoomId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 flex items-center space-x-2">
          <Globe size={20} />
          <span>Discover Public Rooms</span>
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Rooms</option>
              <option value="small">Less than 5 Members</option>
              <option value="large">5+ Members</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading rooms...</p>
        ) : filteredRooms.length === 0 ? (
          <p className="text-gray-600">No matching rooms found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRooms.map((room) => {
              const avatars = generateMockAvatars(room.participantCount);

              return (
                <div key={room.id} className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm space-y-2">
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600">Code: {room.code}</p>

                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex -space-x-2">
                      {avatars.map((avatar, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 ${avatar.color} text-white text-xs flex items-center justify-center rounded-full border-2 border-white`}
                        >
                          {avatar.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{room.participantCount} members</span>
                  </div>

                  <button
                    onClick={() => handleJoin(room.code, room.name)}
                    className="w-full bg-gradient-to-r from-amber-600 to-teal-600 text-white py-2 rounded-lg hover:from-amber-700 hover:to-teal-700 flex justify-center items-center space-x-2 disabled:opacity-50 mt-3"
                    disabled={joiningRoomId === room.code}
                  >
                    {joiningRoomId === room.code ? (
                      <span>Joining...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Join Room</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
