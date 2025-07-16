import type { User } from "./userTypes";

export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginFormErrors {
    username?: string;
    password?: string;
}


export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}


export interface AuthState {
    isLoggedIn: boolean;
    user: User | null
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}
