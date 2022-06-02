import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  listUser: [],
  listError: [],
  user: {
    email: '',
    password: '',
  },
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
