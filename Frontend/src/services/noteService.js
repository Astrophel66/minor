import api from './api';

export const getNotes = async () => {
  const res = await api.get('/notes');
  return res.data;
};

export const createNote = async (formData) => {
  const res = await api.post('/notes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const updateNote = async (noteId, formData) => {
  const res = await api.put(`/notes/${noteId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const deleteNote = async (noteId) => {
  const res = await api.delete(`/notes/${noteId}`);
  return res.data;
};
