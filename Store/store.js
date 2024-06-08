import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../Store/ToDoSlice';

export const store = configureStore({
  reducer: todoReducer
});