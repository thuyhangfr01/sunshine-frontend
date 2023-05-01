import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProjectService from '../services/project.service'

const initialState = [];

export const retrieveProjects = createAsyncThunk(
    "projects/retrieve",
    async (params) => {
        const res = await ProjectService.getAll(params);
        return res.data;
    }
)

export const retrieveLatestProjects = createAsyncThunk (
    "projects/retrieveLatest",
    async () => {
        const res = await ProjectService.getLatestProject();
        return res.data;
    }
)

export const retrieveProject = createAsyncThunk (
    "project/retrieveById",
    async ({id}) => {
        const res = await ProjectService.get(id);
        return res.data;
    }
)

export const findProjectByType = createAsyncThunk (
    "project/findByType",
    async ({id}) => {
        const res = await ProjectService.findByType(id);
        return res.data;
    }
)

export const findProjectByStatus = createAsyncThunk (
    "project/findByStatus",
    async ({id}) => {
        const res = await ProjectService.findByType(id);
        return res.data;
    }
)

const projectSlice = createSlice({
    name: "projects",
    initialState,
    extraReducers: {
        [retrieveProjects.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveLatestProjects.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveProject.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [findProjectByType.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [findProjectByStatus.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    }
})

const {reducer} = projectSlice;
export default reducer;