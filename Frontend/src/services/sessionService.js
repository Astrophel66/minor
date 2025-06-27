import API from './api'; 

export const startSession = async (startTime, endTime, durationMinutes) => {
  const res = await API.post('/sessions/start', {
    startTime,
    endTime,
    durationMinutes
  });
  return res.data;
};

export const getMySessions = async () => {
  const res = await API.get('/sessions/my-sessions');
  return res.data;
};
