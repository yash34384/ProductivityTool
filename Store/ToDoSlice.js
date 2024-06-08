import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    {
      id: '',
      description: '',
      isImportant: 1,
      isUrgent: 1,
      taskType: 0,
      state: 0
    }
  ]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {

    },
    removeTodo: (state, action) => {

    }
  }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;