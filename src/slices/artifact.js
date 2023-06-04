import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ArtifactService from '../services/artifact.service'

const initialState = {
    artifacts: [],
    contributionArtifacts: []
};

export const getListContributionArtifacts = createAsyncThunk(
    "artifact/getListContributionArtifacts",
    async () => {
        const res = await ArtifactService.getListContributionArtifacts();
        return res.data;
    }
)
export const getListContributionArtifactsByUserId = createAsyncThunk(
    "artifact/getListContributionArtifactsByUserId",
    async ({userId}) => {
        const res = await ArtifactService.getListContributionArtifactsByUserId(userId);
        return res.data;
    }
)
export const getArtifactsByContributionId = createAsyncThunk(
    "artifact/getArtifactsByContributionId",
    async ({id}) => {
        const res = await ArtifactService.getArtifactsByContributionId(id);
        return res.data;
    }
)
export const updateArtifactStatus = createAsyncThunk(
    "artifact/updateArtifactStatus",
    async ({artId, artifactId, receivedAmount, statusId}) => {
        const res = await ArtifactService.updateArtifactStatus(artId, artifactId, receivedAmount, statusId);
        return res.data;
    }
)

const nameSlice = createSlice({
    name: "artifacts",
    initialState,
    extraReducers: {
        [updateArtifactStatus.fulfilled]: (state, action) => {
            let index = state.contributionArtifacts.findIndex(c => c.id === action.payload.artifactId);
            state[index] = {
                ...state[index],
                ...action.payload
            }
        }, 
        [getListContributionArtifacts.fulfilled]: (state, action) => {
            state.artifacts = [...action.payload];
        },
        [getListContributionArtifactsByUserId.fulfilled]: (state, action) => {
            state.artifacts = [...action.payload];
        },
        [getArtifactsByContributionId.fulfilled]: (state, action) => {
            state.contributionArtifacts = [...action.payload];
        }
    }
})

const {reducer} = nameSlice;
export default reducer;