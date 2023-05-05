import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProjectService from '../services/project.service'

const initialState = {
    projects: [],
    images: [],
    money: [],
    artifacts: [],
    proofs: []
};

export const retrieveProjs = createAsyncThunk(
    "projs/retrieve",
    async () => {
        const res = await ProjectService.getAllProj();
        return res.data;
    }
)

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
    async (params) => {
        const res = await ProjectService.findByType(params);
        return res.data;
    }
)

export const findProjectByStatus = createAsyncThunk (
    "project/findByStatus",
    async (params) => {
        const res = await ProjectService.findByType(params);
        return res.data;
    }
)

export const getAllStatus = createAsyncThunk (
    "project/getAllStatus",
    async (id) => {
        const res = await ProjectService.getAllImages(id);
        return res.data;
    }
)

export const getAllMoney = createAsyncThunk (
    "project/getAllMoney",
    async (id) => {
        const res = await ProjectService.getAllMoney(id);
        return res.data;
    }
)

export const getAllArtifacts = createAsyncThunk (
    "project/getAllArtifacts",
    async (id) => {
        const res = await ProjectService.getAllArtifacts(id);
        return res.data;
    }
)

export const getAllProofs = createAsyncThunk (
    "project/getAllProofs",
    async (id) => {
        const res = await ProjectService.getAllProofs(id);
        return res.data;
    }
)

const projectSlice = createSlice({
    name: "projects",
    initialState,
    extraReducers: {
        [retrieveProjs.fulfilled]: (state, action) => {
            return [...action.payload];
        },
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