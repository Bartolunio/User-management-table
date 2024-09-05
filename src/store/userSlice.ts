import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

interface FilterCriteria {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<FilterCriteria>) => {
      const filters = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        Object.entries(filters).every(([key, value]) =>
          user[key as keyof User].toLowerCase().includes(value.toLowerCase())
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
