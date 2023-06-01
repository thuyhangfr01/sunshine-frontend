import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setMessage } from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ name, email, phone, password }, thunkAPI) => {
        try{
            const response = await AuthService.register(name, email, phone, password);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch(error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try{
            const data = await AuthService.login(email, password);
            return { user : data };
        } catch(error){
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();   
            thunkAPI.dispatch(setMessage(setMessage));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout();
    }
);

export const removePersistRoot = createAsyncThunk(
    "removePersistRoot",
    async () => {
        await AuthService.removePersistRoot();
    }
);

const initialState = user 
    ? { isLoggedIn: true, user, showLoading: false }
    : { isLoggedIn: false, user:null, showLoading: true };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled] : (state, action) => {
            state.isLoggedIn = false;
            state.showLoading= false;
        },
        [register.rejected] : (state, action) => {
            state.isLoggedIn = false;
            state.showLoading= false;
        },
        [login.fulfilled] : (state, action) => {
            state.isLoggedIn = true;
            state.showLoading= true;
            state.user = action.payload.user;
        },
        [login.rejected] : (state, action) => {
            state.isLoggedIn = false;
            state.showLoading= false;
            state.user = null;
        },
        [logout.fulfilled] : (state, action) => {
            state.isLoggedIn = false;
            state.showLoading= false;
            state.user = null;
        },
    },
});

const {reducer} = authSlice;
export default reducer;