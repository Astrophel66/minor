import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Plus, Search, Edit, Trash2, Clock } from 'lucide-react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';
import { toast } from 'react-toastify';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (file) formData.append('file', file);

      if (selectedNote) {
        await updateNote(selectedNote.id, formData);
        toast.success('Note updated');
      } else {
        await createNote(formData);
        toast.success('Note created');
      }

      setIsModalOpen(false);
      setTitle('');
      setContent('');
      setFile(null);
      setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save note');
    }
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(noteId);
      toast.success('Note deleted');
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">My Notes</h1>
          <button
            onClick={() => {
              setSelectedNote(null);
              setTitle('');
              setContent('');
              setFile(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Note</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setSelectedNote(note);
                      setTitle(note.title);
                      setContent(note.content);
                      setFile(null);
                      setIsModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-amber-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
              {note.filePath && (
                <a
                  href={`http://localhost:5000/${note.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  {note.filePath.split('/').pop()}
                </a>
              )}
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <Clock className="w-5 h-4 mr-1" />
                {new Date(note.updatedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                rows={8}
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none"
              />

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}
              >
                <p className="text-gray-700 mb-4">
                  Drag a file here or{' '}
                  <label className="text-amber-600 cursor-pointer underline">
                    upload a file
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </p>
                {file && (
                  <p className="text-sm text-gray-600 mt-2">Selected: {file.name}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-teal-600 text-white rounded-lg hover:from-amber-700 hover:to-teal-700"
                >
                  {selectedNote ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
