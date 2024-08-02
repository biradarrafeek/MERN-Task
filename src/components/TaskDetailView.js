import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskById } from '../store/taskActions';
import { useParams, Link } from 'react-router-dom';

const TaskDetailView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      {task && (
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <p className="text-gray-600 mb-2">Status: {task.status}</p>
          <p className="text-gray-600 mb-4">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <Link to={`/edit/${task._id}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Edit Task
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskDetailView;
