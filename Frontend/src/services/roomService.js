import API from './api';

export const createRoom = async (name) => {
  const res = await API.post('/rooms/create', { name });
  return res.data;
};

export const joinRoom = async (code) => {
  const res = await API.post(`/rooms/join/${code}`);
  return res.data;
};

export const getMyRooms = async () => {
  const res = await API.get('/rooms/my-rooms');
  return res.data;
};

export const getRoomDetails = async (id) => {
  const res = await API.get(`/rooms/${id}`);
  return res.data;
};

export const getShareableLink = async (id) => {
  const res = await API.get(`/rooms/shareable-link/${id}`);
  return res.data;
};

export const deleteRoom = async (id) => {
  const res = await API.delete(`/rooms/${id}`);
  return res.data;
};
