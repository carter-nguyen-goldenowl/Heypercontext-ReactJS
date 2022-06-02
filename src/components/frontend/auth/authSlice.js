import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  listUser: [],
  listError: [],
  user: {
    email: '',
    password: '',
  },
<<<<<<< HEAD
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state, action) => {
        state.listError = "Invalid Credentials";
        state.status = "idle";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.status = "idle";
      });
  },
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("/api/login", data);
  if (res) {
    return res.data;
  }
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post("api/register", data);
  if (res) {
    return res.data;
  }
});
=======
};

const login = (state, action) => {
  state.user.email = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login,
  },
});

export const { actions, reducer } = authSlice;

// export const login = createAsyncThunk('login', async (data) => {
//   const res = await axios.post('/api/login', data).catch((error) => {
//     console.log('erorr here');
//     return error;
//   });
//   console.log('res here');
//   return res.data;
// });
>>>>>>> 8562988b03458687fb98dde54e9f7df303a322d3
