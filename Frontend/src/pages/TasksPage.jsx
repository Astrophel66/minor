import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTasks, createTask, toggleTask, deleteTask, editTask } from '../services/taskService';
import { toast } from 'react-toastify';

const TasksPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [toggleLoadingId, setToggleLoadingId] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [isAuthenticated, navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setAddLoading(true);
      const newTask = await createTask(title);
      setTasks([newTask, ...tasks]);
      setTitle('');
      toast.success('Task added!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add task');
    }
    setAddLoading(false);
  };

  const handleToggleTask = async (task) => {
    try {
      setToggleLoadingId(task.id);
      const updatedTask = await toggleTask(task.id);
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      toast.success('Task updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    }
    setToggleLoadingId(null);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete task');
    }
  };

  const startEditing = (task) => {
    setEditing(task.id);
    setEditTitle(task.title);
  };

  const cancelEditing = () => {
    setEditing(null);
    setEditTitle('');
  };

  const saveEdit = async (task) => {
    if (!editTitle.trim()) return;
    try {
      const updatedTask = await editTask(task.id, editTitle);
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      cancelEditing();
      toast.success('Task updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

        <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task"
            className="border rounded px-3 py-2 flex-1"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={addLoading}>
            {addLoading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li
                key={task.id}
                className={`p-3 rounded border flex items-center justify-between ${
                  task.completed ? 'bg-green-100 line-through' : 'bg-white'
                }`}
              >
                <div className="flex items-center flex-1 gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    disabled={toggleLoadingId === task.id}
                    onChange={() => handleToggleTask(task)}
                  />
                  {editing === task.id ? (
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <span className="flex-1">{task.title}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {editing === task.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task)}
                        className="px-2 py-1 bg-green-400 rounded text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-2 py-1 bg-gray-300 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(task)}
                        className="px-2 py-1 bg-yellow-400 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
