import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProjectService from '../services/project.service'

const initialState = {
    projects: [],
    listProjectName: [],
    images: [],
    money: [],
    artifacts: [],
    proofs: [],
    totalMoney: 0
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

export const retrieveLatestProjectsByName = createAsyncThunk(
    "tutorials/retrieveLatestByName",
    async ({name}) => {
      const res = await ProjectService.findByTitle(name);
      return res.data;
    }
  );

export const retrieveTop5LatestProjects = createAsyncThunk (
    "projects/retrieveTop5Latest",
    async () => {
        const res = await ProjectService.getTop5LatestProject();
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

export const getTotalMoneyByProjectId = createAsyncThunk (
    "project/getTotalMoney",
    async ({id}) => {
        const res = await ProjectService.getTotalMoneyByProjectId(id);
        return res.data;
    }
)

export const createProject = createAsyncThunk (
    "project/createProject",
    async ({name, details, typeId, numVolunteers, startTime, endTime, holdTime, position}) => {
        const res = await ProjectService.createProject(name, details, typeId, numVolunteers, startTime, endTime, holdTime, position);
        return res.data;
    }
)

export const createMoneyByProject = createAsyncThunk (
    "project/createMoneyByProject",
    async ({id, minMoney}) => {
        const res = await ProjectService.createMoneyByProject(id, minMoney);
        return res.data;
    }
)

export const createArtifactByProject = createAsyncThunk (
    "project/createActifactByProject",
    async ({id, artifactName, minQuantity, calculationUnit}) => {
        const res = await ProjectService.createArtifactByProject(id, artifactName, minQuantity, calculationUnit);
        return res.data;
    }
)

export const createImageByProject = createAsyncThunk (
    "project/createImageByProject",
    async ({id, name}) => {
        const res = await ProjectService.createImageByProject(id, name);
        return res.data;
    }
)

export const createProofByProject = createAsyncThunk (
    "project/createProofByProject",
    async ({id, name}) => {
        const res = await ProjectService.createProofByProject(id, name);
        return res.data;
    }
)

export const updateProject = createAsyncThunk (
    "project/updateProject",
    async ({id, name, details, typeId, statusId, numVolunteers, startTime, endTime, holdTime, position }) => {
        const res = await ProjectService.updateProject(id, name, details, typeId, statusId, numVolunteers, startTime, endTime, holdTime, position);
        return res.data;
    }
)

export const updateMoneyById = createAsyncThunk (
    "project/updateMoneyById",
    async ({moneyId, minMoney }) => {
        const res = await ProjectService.updateMoneyById(moneyId, minMoney);
        return res.data;
    }
)

export const updateArtifactById = createAsyncThunk (
    "project/updateArtifactById",
    async ({artifactId, artifactName, minQuantity, calculationUnit}) => {
        const res = await ProjectService.updateArtifactById(artifactId, artifactName, minQuantity, calculationUnit);
        return res.data;
    }
)


const projectSlice = createSlice({
    name: "projects",
    initialState,
    extraReducers: {
        [createProject.fulfilled]: (state, action) => {
            state.projects = action.payload;
        },
        [createMoneyByProject.fulfilled]: (state, action) => {
            state.money = action.payload;
        },
        [createArtifactByProject.fulfilled]: (state, action) => {
            state.artifacts.push(action.payload);
        },
        [createImageByProject.fulfilled]: (state, action) => {
            state.images.push(action.payload);
        },
        [createProofByProject.fulfilled]: (state, action) => {
            state.proofs.push(action.payload);
        },
        [updateProject.fulfilled]: (state, action) =>{
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            state.projects[index] = {
                ...state.projects[index],
                ...action.payload
            }
        },
        [updateMoneyById.fulfilled]: (state, action) =>{
            const index = state.money.findIndex(m => m.id === action.payload.moneyId);
            state.money[index] = {
                ...state.money[index],
                ...action.payload
            }
        },
        [updateArtifactById.fulfilled]: (state, action) =>{
            const index = state.artifacts.findIndex(a => a.id === action.payload.artifactId);
            state.artifacts[index] = {
                ...state.artifacts[index],
                ...action.payload
            }
        },
        [retrieveProjs.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveProjects.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveLatestProjects.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveLatestProjectsByName.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveTop5LatestProjects.fulfilled]: (state, action) => {
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
        [getTotalMoneyByProjectId.fulfilled]: (state, action) => {
            state.totalMoney = action.payload.totalMoney;
        },
    }
})

const {reducer} = projectSlice;
export default reducer;