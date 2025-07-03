import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ActiveStudyRoom() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Study Room #{id}</h1>
        <p>This is where your custom UI (timer, chat, notes, video) can go.</p>
      </div>
    </div>
  );
}
