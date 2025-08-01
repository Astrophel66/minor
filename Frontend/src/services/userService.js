import API from './api';

// Get user profile by ID
export const getUserProfile = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

// Get dashboard statistics for the logged-in user
export const getDashboardStats = async () => {
  const res = await API.get('/users/dashboard-stats');
  return res.data;
};
