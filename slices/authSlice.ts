import type { LoginFormData, LoginResponse } from '@/types/authTypes';
import type { User } from '@/types/userTypes';
import axiosInstance from '@/utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

interface AuthState {
    isLoggedIn: boolean;
    user: User | null
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
}



// login thunk
export const login = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('Login failed due to unknown error');
    }
});

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>('auth/user', async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('User get failed due to unknown error');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.user = null
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })

            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'User get failed';
            });
    },
})

export const {
    logout,
} = authSlice.actions;
export default authSlice.reducer;