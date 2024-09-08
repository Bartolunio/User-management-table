import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/types';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as User[];
});

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  darkMode: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof UserState['filters']; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.filteredUsers = state.users.filter((user) =>
        Object.entries(state.filters).every(([filterKey, filterValue]) => {
          const filterValueStr = filterValue.toString().toLowerCase();
          const userValueStr = (user[filterKey as keyof User] || '')
            .toString()
            .toLowerCase();
          return userValueStr.includes(filterValueStr);
        })
      );
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredUsers = state.users;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    });
  },
});

export const { setFilter, resetFilters, toggleDarkMode } = userSlice.actions;
export default userSlice.reducer;
