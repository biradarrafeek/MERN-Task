import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask, fetchTaskById } from '../store/taskActions';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.task);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (task && id) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });
    }
  }, [task, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTask(id, formData));
    } else {
      dispatch(createTask(formData));
    }
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Update Task' : 'Create Task'}</h1>
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              placeholder="Status"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">{id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
