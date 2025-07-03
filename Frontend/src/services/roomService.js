import api from './api';

// Create a new room
export const createRoom = async (name, type = 'private') => {
  if (!name) throw new Error('Room name is required');
  const res = await api.post('/rooms/create', { name, type });
  return res.data;
};

// Get rooms the logged-in user is a member of
export const getMyRooms = async () => {
  const res = await api.get('/rooms/my-rooms');
  return res.data;
};

// Join a room by code (uses URL param)
export const joinRoom = async (code) => {
  if (!code) throw new Error('Room code is required');
  const trimmedCode = code.trim();
  const res = await api.post(`/rooms/join/${trimmedCode}`);
  return res.data;
};

// Delete a room by ID
export const deleteRoom = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
};

// Get all public rooms
export const getPublicRooms = async () => {
  const res = await api.get('/rooms/public');
  return res.data;
};

// Get room details by ID
export const getRoomDetails = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};

// Get shareable invite link for a room
export const getShareableLink = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.get(`/rooms/shareable-link/${id}`);
  return res.data;
};
