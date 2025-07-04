import { useState } from 'react';
import { createNote } from '../services/noteService';
import { toast } from 'react-toastify';

const NoteForm = ({ onClose, onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);
    try {
      await createNote({ title, content, file });
      toast.success('Note created successfully');
      setTitle('');
      setContent('');
      setFile(null);
      onNoteCreated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Enter title..."
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note content here..."
        className="w-full border p-2 rounded"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="border-dashed border-2 p-4 text-center rounded">
        <label className="cursor-pointer">
          Drag a file here or <span className="text-orange-500 underline">upload a file</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {file && (
          <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="border px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
