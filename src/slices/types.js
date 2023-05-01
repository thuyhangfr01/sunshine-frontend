import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TypeService from '../services/type.service'

const initialState = [];

export const retrieveTypes = createAsyncThunk(
    "types/retrieve",
    async () => {
        const res = await TypeService.getAllType();
        return res.data;
    }
)

// export const retrieveStatus = createAsyncThunk(
//     "projects/retrieve/status",
//     async () => {
//         const res = await ProjectService.getAllStatus();
//         return res.data;
//     }
// )

const typeSlice = createSlice({
    name: "types",
    initialState,
    extraReducers: {
        [retrieveTypes.fulfilled]: (state, action) => {
            return [...action.payload];
        }
    }
})

const {reducer} = typeSlice;
export default reducer;
