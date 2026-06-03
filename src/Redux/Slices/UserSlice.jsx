import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//user Register
export const userRegister = createAsyncThunk('register', async (formData) => {
  let response = await fetch('https://apijwt-glev.onrender.com/api/user/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  let data = await response.json();

  if (response.ok) {
    alert('your registration successfully..');
  } else {
    alert(data.message || "registration failed");
  }

  return data;
});


//User Login
export const userLogin = createAsyncThunk('login', async (formData) => {
  let response = await fetch('https://apijwt-glev.onrender.com/api/user/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  let data = await response.json();

  if (data.jwtToken) {
    localStorage.setItem("token", data.jwtToken);
  }

  return data;
});


export const UserSlice = createSlice({
  name: "AUTH",

  initialState: {
    isLoading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    error: null
  },

  // logout added here
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },

  extraReducers: (builder) => {
    //Register
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user || null;
    })
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });

    //Login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.jwtToken;
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });
  }
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
