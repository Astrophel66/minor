const API_URL = 'http://localhost:5000/api/tasks';  // Adjust as needed

const getAuthHeader = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
});

export const getTasks = async () => {
  const res = await fetch(API_URL, { headers: getAuthHeader() });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTask = async (title) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ title: title.trim(), description: '' })
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const toggleTask = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to toggle task');
  return res.json();
};

export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to delete task');
};

export const editTask = async (taskId, title) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ title: title.trim() })
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};
