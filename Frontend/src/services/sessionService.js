import API from './api';

export const startSession = async (startTime, endTime, duration) => {
  const res = await API.post('/sessions/start', {
    startTime,
    endTime,
    duration
  });
  return res.data;
};

export const getMySessions = async () => {
  const res = await API.get('/sessions/my-sessions');
  return res.data;
};

export const getSessionsByRoom = async (roomId) => {
  const res = await API.get(`/sessions/room/${roomId}`);
  return res.data;
};

export const getTotalStudyHours = async () => {
  const res = await API.get('/sessions/total-hours');
  return res.data;
};
