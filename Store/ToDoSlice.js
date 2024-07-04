import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

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
        stage: 0,
        ...action.payload
      }
      state.todos.unshift(todo);
    },
    readTodo: (state, action) => {

    },
    updateTodo: (state, action) => { },
    deleteTodo: (state, action) => { }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createTodo.pending, (state) => { })
  //     .addCase(createTodo.fulfilled, (state, action) => { })
  //     .addCase(createTodo.rejected, (state, action) => { })
  // }
});

// export const createTodo = createAsyncThunk('todo/createTodo', async () => { });

export const { createTodo, readTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;