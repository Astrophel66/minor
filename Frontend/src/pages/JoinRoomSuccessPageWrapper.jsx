import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import JoinRoomSuccess from './JoinRoomSuccess';

export default function JoinRoomSuccessPageWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomName, roomCode } = location.state || {};

  useEffect(() => {
    if (!roomName || !roomCode) {
      navigate('/study-room');
    }
  }, [roomName, roomCode, navigate]);

  if (!roomName || !roomCode) {
    return null;
  }

  return <JoinRoomSuccess roomName={roomName} roomCode={roomCode} />;
}
