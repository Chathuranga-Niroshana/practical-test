import type { LoginFormData, LoginResponse } from '@/types/authTypes';
import axiosInstance from '@/utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

interface AuthState {
    isLoggedIn: boolean;
    user: {
        id: number | null;
        username: string | null;
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        gender: string | null;
        image: string | null;
    };
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: {
        id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        gender: null,
        image: null,
    },
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.user = {
                id: null,
                username: null,
                email: null,
                firstName: null,
                lastName: null,
                gender: null,
                image: null,
            };
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
                state.user = {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    gender: action.payload.gender,
                    image: action.payload.image,
                };
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            });
    },
})

export const {
    logout,
} = authSlice.actions;
export default authSlice.reducer;