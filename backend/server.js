const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: 'Task deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
