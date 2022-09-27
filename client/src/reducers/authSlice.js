import * as api from "../api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
export const signIn = createAsyncThunk("signIn", async (signInData) => {
  try {
    //signIn
    const { data } = await api.signIn(signInData);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const signUp = createAsyncThunk("signUp", async (signUpData) => {
  try {
    //signUp

    const { data } = await api.signUp(signUpData);

    return data;
  } catch (error) {
    console.log(error);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    logged: false,
  },
  reducers: {
    login(state, action) {
      const { payload } = action;

      const decoded = jwt_decode(payload.credential);

      localStorage.setItem(
        "profile",
        JSON.stringify({ result: decoded, token: payload.credential })
      );
      state.authData = decoded;
      state.logged = true;
    },
    logout(state) {
      localStorage.removeItem("profile");
      state.authData = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {},
    [signIn.fulfilled]: (state, { payload }) => {
      if (payload !== null && payload !== undefined) {
        // const decoded = jwt_decode(payload.token); // same with google token => payload.credential

        localStorage.setItem("profile", JSON.stringify(payload));
        state.authData = payload;
      }
    },
    [signIn.rejected]: (state, action) => {},
    [signUp.pending]: (state, action) => {},
    [signUp.fulfilled]: (state, { payload }) => {
      if (payload !== null && payload !== undefined) {
        localStorage.setItem("profile", JSON.stringify(payload));
        state.authData = payload;
      } else {
      }
    },
    [signUp.rejected]: (state, action) => {
      console.log("signUp rejected");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
