import api from './api';

export const createRoom = async (name, type = 'private') => {
  if (!name) throw new Error('Room name is required');
  const res = await api.post('/rooms/create', { name, type });
  return res.data;
};

export const getMyRooms = async () => {
  const res = await api.get('/rooms/my-rooms');
  return res.data;
};

export const joinRoom = async (code) => {
  if (!code) throw new Error('Room code is required');
  const trimmedCode = code.trim();
  const res = await api.post(`/rooms/join/${trimmedCode}`);
  return res.data;
};

export const deleteRoom = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
};

export const getPublicRooms = async () => {
  const res = await api.get('/rooms/public');
  return res.data;
};


export const getRoomDetails = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};


export const getShareableLink = async (id) => {
  if (!id) throw new Error('Room ID is required');
  const res = await api.get(`/rooms/shareable-link/${id}`);
  return res.data;
};
