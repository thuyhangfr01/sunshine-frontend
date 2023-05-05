import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import StatusService from '../services/status.service'

const initialState = [];

export const retrieveStatus = createAsyncThunk(
    "status/retrieve",
    async () => {
        const res = await StatusService.getAllStatus();
        return res.data;
    }
)

const statusSlice = createSlice({
    name: "status",
    initialState,
    extraReducers: {
        [retrieveStatus.fulfilled]: (state, action) => {
            return [...action.payload];
        }
    }
})

const {reducer} = statusSlice;
export default reducer;
