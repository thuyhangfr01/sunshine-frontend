import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ContributionService from '../services/contribution.service'

const initialState = {
    contributions: [],
    artifacts: [],
};

export const createContribution = createAsyncThunk(
    "projects/createContribution", 
    async ({userId, projectId, nickname, messages, amountMoney}) => {
        const res = await ContributionService.createContribution(userId, projectId, nickname, messages, amountMoney);
        return res.data;
    }
)

export const createArtifactByContribution = createAsyncThunk (
    "project/createActifactByContribution",
    async ({id, artifactName, donatedAmount, calculationUnit}) => {
        const res = await ContributionService.createArtifactByContribution(id, artifactName, donatedAmount, calculationUnit);
        return res.data;
    }
)


const contributionSlice = createSlice({
    name: "contributions",
    initialState,
    extraReducers: {
        [createContribution.fulfilled]: (state, action) => {
            state.contributions = [...state.contributions, action.payload];
        },
        [createArtifactByContribution.fulfilled]: (state, action) => {
            state.artifacts = action.payload;
        }
    }
})

const {reducer} = contributionSlice;
export default reducer;
