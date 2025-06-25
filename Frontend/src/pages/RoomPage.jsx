import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Users, Copy, Check } from 'lucide-react';
import { getRoomDetails } from '../services/roomService';

export default function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(id);
        setRoom(data);
      } catch (err) {
        console.error('Error fetching room:', err);
        alert('Failed to load room details');
      }
    };

    fetchRoom();
  }, [id]);

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        {!room ? (
          <p className="text-gray-600">Loading room details...</p>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">{room.name}</h1>

            <div className="flex items-center space-x-2 mb-6">
              <p className="text-gray-700 text-lg font-mono">Code: {room.code}</p>
              <button onClick={copyCode} className="text-amber-600 hover:text-amber-700">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <h2 className="text-xl font-semibold mb-3">Members:</h2>
            {room.Users && room.Users.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {room.Users.map((user) => (
                  <li key={user.id}>{user.username} ({user.email})</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No members found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
