import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Send, 
  Paperclip, 
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Users,
  Search,
  Settings
} from 'lucide-react';

const CollaboratePage = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(1);

  const users = [
    { id: 1, name: 'Sarah Chen', avatar: 'SC', status: 'online', lastSeen: 'Active now' },
    { id: 2, name: 'Mike Rodriguez', avatar: 'MR', status: 'online', lastSeen: 'Active now' },
    { id: 3, name: 'Emma Thompson', avatar: 'ET', status: 'away', lastSeen: '5 min ago' },
    { id: 4, name: 'Alex Kim', avatar: 'AK', status: 'offline', lastSeen: '2 hours ago' },
    { id: 5, name: 'Jessica Park', avatar: 'JP', status: 'online', lastSeen: 'Active now' },
    { id: 6, name: 'David Wilson', avatar: 'DW', status: 'away', lastSeen: '15 min ago' }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'SC',
      content: 'Hey! Are you ready for our calculus study session?',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'Me',
      avatar: 'JD',
      content: 'Yes! I have all my notes ready. Should we start with integration by parts?',
      time: '10:32 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Sarah Chen',
      avatar: 'SC',
      content: 'Perfect! I\'ve been struggling with that topic. I found some good examples we can work through.',
      time: '10:33 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'Me',
      avatar: 'JD',
      content: 'Great! I also have the practice problems from chapter 7. We can solve them together.',
      time: '10:35 AM',
      isMe: true
    },
    {
      id: 5,
      sender: 'Sarah Chen',
      avatar: 'SC',
      content: 'Sounds like a plan! Should we start a video call?',
      time: '10:36 AM',
      isMe: false
    }
  ];

  const activeRooms = [
    { name: 'Advanced Calculus', members: 8, topic: 'Integration Techniques' },
    { name: 'Chemistry Lab', members: 12, topic: 'Organic Reactions' },
    { name: 'History Project', members: 4, topic: 'WWII Research' }
  ];

  const statusColors = {
    online: 'bg-emerald-400',
    away: 'bg-yellow-400',
    offline: 'bg-gray-400'
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Users and Rooms */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Collaborate</h2>
                <Settings className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Active Users */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Study Partners</h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedUser === user.id ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{user.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[user.status]} rounded-full border-2 border-white`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.lastSeen}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Study Rooms */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Rooms</h3>
              <div className="space-y-2">
                {activeRooms.map((room, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{room.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {room.members}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{room.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {users.find(u => u.id === selectedUser)?.avatar}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[users.find(u => u.id === selectedUser)?.status]} rounded-full border-2 border-white`}></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {users.find(u => u.id === selectedUser)?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {users.find(u => u.id === selectedUser)?.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-md ${msg.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-xs">{msg.avatar}</span>
                    </div>
                    <div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        msg.isMe 
                          ? 'bg-gradient-to-r from-amber-600 to-teal-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="text-gray-500 hover:text-amber-600 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-amber-600 to-teal-600 text-white p-3 rounded-full hover:from-amber-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This is a preview of the collaboration interface. Real-time messaging and video calls will be implemented in future updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePage;