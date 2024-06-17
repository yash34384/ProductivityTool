import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        state: 0,
        ...action.payload
      }
      state.todos.push(todo);
      console.log(todo);
    },
    readTodo: (state, action) => {

    },
    updateTodo: (state, action) => { },
    deleteTodo: (state, action) => { }
  }
});

export const { createTodo, readTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;