import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterState, User } from '../types/types';

interface UserState {
  users: User[];
  filteredUsers: User[];
  filters: FilterState;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filters: { name: '', username: '', email: '', phone: '' },
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredUsers = state.users.filter((user) =>
        Object.keys(state.filters).every((key) =>
          user[key as keyof User]
            .toLowerCase()
            .includes(state.filters[key as keyof FilterState].toLowerCase())
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
