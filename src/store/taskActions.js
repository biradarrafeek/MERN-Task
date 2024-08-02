import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_ERROR', payload: error.message });
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch({ type: 'FETCH_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASK_ERROR', payload: error.message });
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, task);
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_ERROR', payload: error.message });
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_TASK_ERROR', payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_TASK_ERROR', payload: error.message });
  }
};
