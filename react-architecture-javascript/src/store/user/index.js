import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiLogin } from '@src/services/user.service';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiLogin();

      return response.data;
    } catch (err) {
      return rejectWithValue('User not found!');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    logout: (state) => {
      state.isLoggedIn = false;
    },
    login: (state, action) => {
      const { email } = action.payload;

      if (email === 'user@gmail.com') {
        state.isLoggedIn = true;
      } else {
        console.log('User or password wrong!');
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log('state: ', state, action);
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout, login } = userSlice.actions;

export default userSlice.reducer;