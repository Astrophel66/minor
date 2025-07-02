import API from './api';

export const getUserProfile = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await API.get('/users/dashboard-stats');
  return res.data;
};
