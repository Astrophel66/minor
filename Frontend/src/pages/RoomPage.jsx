import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Users, Copy, CheckCircle, Share2, ArrowLeft } from 'lucide-react';
import { getRoomDetails, getShareableLink } from '../services/roomService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

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
    toast.success('Room code copied');
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
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
              <span className={`px-3 py-1 text-sm rounded-lg ${room.type === 'public' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                {room.type === 'public' ? 'Public Room' : 'Private Room'}
              </span>
            </div>

            <div className="flex flex-wrap items-center space-x-2 mb-6">
              <p className="text-gray-700 font-mono">Code: {room.code}</p>
              <button onClick={copyCode} className="text-amber-600 hover:text-amber-700">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <Users size={18} className="mr-2" /> Members
            </h2>

            <div className="space-y-2 mb-6">
              {room.Users?.length > 0 ? (
                room.Users.map((member) => (
                  <div key={member.id} className="flex items-center justify-between border border-gray-200 p-3 rounded-lg bg-white">
                    <span className="text-gray-800">{member.username}</span>
                    <div className="flex items-center space-x-2">
                      {member.id === room.creatorId && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Creator</span>
                      )}
                      {member.id === user?.id && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">You</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No members yet.</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={copyLink}
                className="flex-1 bg-gradient-to-r from-amber-600 to-teal-600 text-white py-2 rounded-lg hover:from-amber-700 hover:to-teal-700 flex items-center justify-center space-x-2"
              >
                <Share2 size={16} />
                <span>Copy Invite Link</span>
              </button>

              <button
                onClick={() => navigate('/study-room')}
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to My Rooms</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
