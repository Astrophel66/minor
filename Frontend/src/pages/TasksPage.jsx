import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Plus, 
  MoreHorizontal,
  Calendar,
  Flag,
  User,
  Clock
} from 'lucide-react';

const TasksPage = () => {
  const [newTask, setNewTask] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'gray' },
    { id: 'progress', title: 'In Progress', color: 'teal' },
    { id: 'completed', title: 'Completed', color: 'emerald' }
  ];

  const tasks = {
    todo: [
      {
        id: 1,
        title: 'Review Calculus Chapter 5',
        description: 'Go through integration problems 1-20',
        priority: 'high',
        dueDate: '2024-01-15',
        assignee: 'Me',
        tags: ['Math', 'Calculus']
      },
      {
        id: 2,
        title: 'Chemistry Lab Report',
        description: 'Write up results from titration experiment',
        priority: 'medium',
        dueDate: '2024-01-18',
        assignee: 'Me',
        tags: ['Chemistry', 'Lab']
      },
      {
        id: 3,
        title: 'Group Project Research',
        description: 'Research sources for history presentation',
        priority: 'low',
        dueDate: '2024-01-20',
        assignee: 'Team',
        tags: ['History', 'Research']
      }
    ],
    progress: [
      {
        id: 4,
        title: 'Physics Problem Set 8',
        description: 'Working on thermodynamics problems',
        priority: 'high',
        dueDate: '2024-01-16',
        assignee: 'Me',
        tags: ['Physics', 'Homework']
      },
      {
        id: 5,
        title: 'Literature Essay Draft',
        description: 'First draft of Hamlet analysis essay',
        priority: 'medium',
        dueDate: '2024-01-19',
        assignee: 'Me',
        tags: ['Literature', 'Essay']
      }
    ],
    completed: [
      {
        id: 6,
        title: 'Biology Chapter 12 Notes',
        description: 'Completed summary notes on cell division',
        priority: 'medium',
        dueDate: '2024-01-12',
        assignee: 'Me',
        tags: ['Biology', 'Notes']
      },
      {
        id: 7,
        title: 'Spanish Vocabulary Review',
        description: 'Memorized 50 new vocabulary words',
        priority: 'low',
        dueDate: '2024-01-10',
        assignee: 'Me',
        tags: ['Spanish', 'Vocabulary']
      }
    ]
  };

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-emerald-500 bg-emerald-50'
  };

  const priorityBadgeColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-emerald-100 text-emerald-800'
  };

  const addTask = () => {
    if (newTask.trim()) {
      // In a real app, this would add to the backend
      console.log('Adding task:', newTask, 'to column:', selectedColumn);
      setNewTask('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
            <p className="text-gray-600">Organize your study tasks and track progress</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {columns.map(column => (
                <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-teal-700 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    column.color === 'gray' ? 'bg-gray-400' :
                    column.color === 'teal' ? 'bg-teal-400' : 'bg-emerald-400'
                  }`}></div>
                  <span>{column.title}</span>
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tasks[column.id].length}
                  </span>
                </h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {tasks[column.id].map((task) => (
                  <div 
                    key={task.id}
                    className={`bg-white rounded-lg p-4 border-l-4 ${priorityColors[task.priority]} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {task.title}
                      </h3>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityBadgeColors[task.priority]}`}>
                        <Flag className="w-3 h-3 inline mr-1" />
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Add Task Button for Column */}
                <button
                  onClick={() => {
                    setSelectedColumn(column.id);
                    // Focus on the main input
                    document.querySelector('input[placeholder="Add new task..."]')?.focus();
                  }}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-amber-300 hover:text-amber-600 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add task to {column.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Task Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Object.values(tasks).flat().length}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {tasks.completed.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-teal-600 mt-1">
                  {tasks.progress.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {Object.values(tasks).flat().filter(task => task.priority === 'high').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;