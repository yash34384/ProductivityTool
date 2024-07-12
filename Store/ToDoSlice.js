import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { createToDo } from "../Utils/database";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // createTodo: (state, action) => {
    //   const todo = {
    //     id: nanoid(),
    //     stage: 0,
    //     ...action.payload,
    //   };
    //   state.todos.unshift(todo);
    // },
    readTodo: (state, action) => {},
    updateTodo: (state, action) => {},
    deleteTodo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const createTodo = createAsyncThunk("todo/createTodo", async (todo) => {
  try {
    const res = await createToDo(todo);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const { readTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
