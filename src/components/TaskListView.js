import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../store/taskActions';
import { Link } from 'react-router-dom';

const TaskListView = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'asc') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Task List</h1>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Filter by title"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto"
          />
          <div className="flex mb-4 sm:mb-0">
            <button onClick={() => setSort('asc')} className="p-2 border rounded mr-2 bg-blue-500 text-white">Sort Asc</button>
            <button onClick={() => setSort('desc')} className="p-2 border rounded bg-blue-500 text-white">Sort Desc</button>
          </div>
          <Link to="/create" className="p-2 bg-green-500 text-white rounded">Create Task</Link>
        </div>
        <ul className="space-y-4">
          {sortedTasks.map((task) => (
            <li key={task._id} className="p-4 bg-blue-100 rounded shadow">
              <h1 to={`/tasks/${task._id}`} className="text-2xl font-semibold text-blue-800">{task.title}</h1>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <div className="flex space-x-2 mt-2">
                <Link to={`/edit/${task._id}`} className="p-2 bg-yellow-500 text-white rounded">Update</Link>
                <button onClick={() => handleDelete(task._id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskListView;
