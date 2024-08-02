const initialState = {
  tasks: [],
  task: null,
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload };
    case 'FETCH_TASKS_ERROR':
      return { ...state, error: action.payload };
    case 'FETCH_TASK_SUCCESS':
      return { ...state, task: action.payload };
    case 'FETCH_TASK_ERROR':
      return { ...state, error: action.payload };
    case 'CREATE_TASK_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'CREATE_TASK_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'UPDATE_TASK_ERROR':
      return { ...state, error: action.payload };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case 'DELETE_TASK_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
