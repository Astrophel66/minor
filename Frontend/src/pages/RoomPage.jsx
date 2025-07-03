import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Copy, Check, Users, User } from 'lucide-react';
import { getRoomDetails, getShareableLink } from '../services/roomService';
import { toast } from 'react-toastify';

const generateMockAvatarColor = (index) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
  return colors[index % colors.length];
};

export default function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(id);
        setRoom(data);

        const linkData = await getShareableLink(id);
        setShareLink(linkData.link);
      } catch (err) {
        console.error('Error fetching room:', err);
        toast.error('Failed to load room details');
        navigate('/study-room');
      }
    };

    fetchRoom();
  }, [id, navigate]);

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success('Invite link copied');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        {!room ? (
          <p className="text-gray-600">Loading room details...</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
              <span
                className={`text-sm font-medium px-2 py-0.5 rounded ${room.type === 'public' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}
              >
                {room.type === 'public' ? 'Public' : 'Private'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-gray-700 font-mono">Code: {room.code}</p>
              <button onClick={copyCode} className="text-amber-600 hover:text-amber-700">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center space-x-1">
                <Users className="w-5 h-5" />
                <span>Participants</span>
              </h2>

              {room.Users?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {room.Users.map((user, index) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <div className={`w-8 h-8 ${generateMockAvatarColor(index)} text-white rounded-full flex items-center justify-center text-sm`}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No members found.</p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={copyLink}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
              >
                Copy Invite Link
              </button>
              <button
                onClick={() => navigate('/study-room')}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                Back to Study Rooms
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
