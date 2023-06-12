import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import NameService from '../services/name.service'

const initialState = {
    name: []
};

export const retrieveListProjectName = createAsyncThunk(
    "projects/retrieveListProjectName", 
    async () => {
        const res = await NameService.getListProjectName();
        return res.data;
    }
)

const nameSlice = createSlice({
    name: "name",
    initialState,
    extraReducers: {
        [retrieveListProjectName.fulfilled]: (state, action) => {
            return [...action.payload];
        }
    }
})

const {reducer} = nameSlice;
export default reducer;
