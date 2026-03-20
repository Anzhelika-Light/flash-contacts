import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

axios.defaults.baseURL = "https://connections-api.goit.global/";

interface User {
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post<AuthResponse>("/users/signup", credentials);
      setAuthHeader(res.data.token);
      console.log(res.data.token);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || axiosError.message,
      );
    }
  },
);

export const logIn = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post<AuthResponse>("/users/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || axiosError.message,
      );
    }
  },
);

export const logOut = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || axiosError.message,
      );
    }
  },
);

export const refreshUser = createAsyncThunk<User, void, { state: RootState }>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get<User>("/users/current");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  },
);
