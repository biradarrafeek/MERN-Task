import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskListView from './components/TaskListView';
import TaskDetailView from './components/TaskDetailView';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <Routes>
          <Route exact path="/" element={<TaskListView/>} />
          <Route path="/tasks/:id" element={<TaskDetailView/>} />
          <Route path="/create" element={<TaskForm/>} />
          <Route path="/edit/:id" element={<TaskForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
