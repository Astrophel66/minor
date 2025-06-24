import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  BookOpen,
  Clock,
  Tag
} from 'lucide-react';

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const notes = [
    {
      id: 1,
      title: 'Calculus II - Integration Techniques',
      preview: 'Integration by parts, substitution methods, and partial fractions. Key formulas and examples...',
      category: 'Mathematics',
      lastModified: '2 hours ago',
      color: 'amber',
      tags: ['calculus', 'integration', 'math']
    },
    {
      id: 2,
      title: 'Organic Chemistry - Functional Groups',
      preview: 'Alcohols, aldehydes, ketones, and carboxylic acids. Properties and reactions of each group...',
      category: 'Chemistry',
      lastModified: '1 day ago',
      color: 'teal',
      tags: ['chemistry', 'organic', 'functional-groups']
    },
    {
      id: 3,
      title: 'World War II - Major Events',
      preview: 'Timeline of significant battles, political decisions, and turning points during WWII...',
      category: 'History',
      lastModified: '2 days ago',
      color: 'emerald',
      tags: ['history', 'wwii', 'timeline']
    },
    {
      id: 4,
      title: 'Data Structures - Binary Trees',
      preview: 'Implementation, traversal methods, and common operations on binary search trees...',
      category: 'Computer Science',
      lastModified: '3 days ago',
      color: 'orange',
      tags: ['programming', 'data-structures', 'trees']
    },
    {
      id: 5,
      title: 'Physics - Thermodynamics',
      preview: 'Laws of thermodynamics, heat engines, and entropy. Problem-solving strategies...',
      category: 'Physics',
      lastModified: '5 days ago',
      color: 'red',
      tags: ['physics', 'thermodynamics', 'energy']
    },
    {
      id: 6,
      title: 'Shakespeare - Hamlet Analysis',
      preview: 'Character development, themes, and literary devices in Hamlet. Key quotes and interpretations...',
      category: 'Literature',
      lastModified: '1 week ago',
      color: 'indigo',
      tags: ['literature', 'shakespeare', 'hamlet']
    }
  ];

  const categories = ['All', 'Mathematics', 'Chemistry', 'History', 'Computer Science', 'Physics', 'Literature'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const colorClasses = {
    amber: 'border-l-amber-500 bg-amber-50',
    teal: 'border-l-teal-500 bg-teal-50',
    emerald: 'border-l-emerald-500 bg-emerald-50',
    orange: 'border-l-orange-500 bg-orange-50',
    red: 'border-l-red-500 bg-red-50',
    indigo: 'border-l-indigo-500 bg-indigo-50',
  };

  const handleNoteAction = (action, noteId) => {
    if (action === 'edit') {
      const note = notes.find(n => n.id === noteId);
      setSelectedNote(note);
      setIsModalOpen(true);
    } else if (action === 'delete') {
      // In a real app, this would delete the note
      console.log('Delete note:', noteId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
            <p className="text-gray-600">Organize and access all your study materials</p>
          </div>
          <button
            onClick={() => {
              setSelectedNote(null);
              setIsModalOpen(true);
            }}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-amber-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Note</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
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
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div 
              key={note.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 ${colorClasses[note.color]} border-t border-r border-b border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">{note.category}</span>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNoteAction('edit', note.id);
                    }}
                    className="text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNoteAction('delete', note.id);
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {note.preview}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {note.lastModified}
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first note to get started'
              }
            </p>
            <button
              onClick={() => {
                setSelectedNote(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02]"
            >
              Create Note
            </button>
          </div>
        )}
      </div>

      {/* Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  defaultValue={selectedNote?.title || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter note title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={12}
                  defaultValue={selectedNote?.preview || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Write your note content here..."
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would save the note
                    setIsModalOpen(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-teal-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all"
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