import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage to store
const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: loadTasks()
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        important: false,
        createdAt: new Date().toISOString(),
        dueDate: null,
        reminder: null,
        steps: [],
        repeatConfig: null
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.text = text;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.dueDate = dueDate;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // New functionality: Set Reminder
    setReminder: (state, action) => {
      const { id, reminderTime } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.reminder = reminderTime;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    //  Add Steps to a task
    addStep: (state, action) => {
      const { id, stepText } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        const newStep = {
          id: Date.now().toString(),
          text: stepText,
          completed: false
        };
        if (!task.steps) {
          task.steps = [];
        }
        task.steps.push(newStep);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // Toggle completion status of a step
    toggleStepComplete: (state, action) => {
      const { taskId, stepId } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task && task.steps) {
        const step = task.steps.find(step => step.id === stepId);
        if (step) {
          step.completed = !step.completed;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    // Edit a step
    editStep: (state, action) => {
      const { taskId, stepId, text } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task && task.steps) {
        const step = task.steps.find(step => step.id === stepId);
        if (step) {
          step.text = text;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    // Delete a step
    deleteStep: (state, action) => {
      const { taskId, stepId } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task && task.steps) {
        task.steps = task.steps.filter(step => step.id !== stepId);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    //  SetRepeat task to repeat
    setRepeatTask: (state, action) => {
      const { id, repeatConfig } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        // repeatConfig could be like: { type: 'daily' | 'weekly' | 'monthly', days: [] (for weekly), date: number (for monthly) }
        task.repeatConfig = repeatConfig;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // Create new instance of a repeating task
    createRepeatedTask: (state, action) => {
      const { sourceTaskId, dueDate } = action.payload;
      const sourceTask = state.tasks.find(task => task.id === sourceTaskId);
      
      if (sourceTask) {
        const newTask = {
          ...sourceTask,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date().toISString(),
          dueDate: dueDate
        };
        state.tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    }
  }
});

export const {
  addTask,
  toggleComplete,
  toggleImportant,
  deleteTask,
  editTask,
  setDueDate,
  setReminder,
  addStep,
  toggleStepComplete,
  editStep,
  deleteStep,
  setRepeatTask,
  createRepeatedTask
} = tasksSlice.actions;

export default tasksSlice.reducer;