import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ContributionService from '../services/contribution.service'

const initialState = {
    contributions: [],
    artifacts: [],
};

const contributionArtifacts = [
    {
        artifactName: "",
        calculationUnit: "",
        donatedAmount: 0
    }
]

export const createContribution = createAsyncThunk(
    "contribution/createContribution", 
    async ({userId, projectId, nickname, messages, amountMoney, contributionArtifacts}) => {
        const res = await ContributionService.createContribution(userId, projectId, nickname, messages, amountMoney, contributionArtifacts);
        return res.data;
    }
)

export const createArtifactByContribution = createAsyncThunk (
    "contribution/createActifactByContribution",
    async ({id, artifactName, donatedAmount, calculationUnit}) => {
        const res = await ContributionService.createArtifactByContribution(id, artifactName, donatedAmount, calculationUnit);
        return res.data;
    }
)

export const updateAmountMoneyById = createAsyncThunk(
    "contribution/updateMoneyById",
    async ({mId, amountMoney, moneyId}) => {
        const res = await ContributionService.updateAmountMoneyById(mId, amountMoney, moneyId);
        return res.data;
    }
)

export const updateStatusMoney = createAsyncThunk(
    "contribution/updateStatusByMoneyId",
    async ({moneyId, statusId}) => {
        const res = await ContributionService.updateStatusMoney(moneyId, statusId);
        return res.data;
    }
)

export const getArtifactsByContributionId = createAsyncThunk(
    "contribution/getArtifactsByContributionId",
    async ({id}) => {
        const res = await ContributionService.getArtifactsByContributionId(id);
        return res.data;
    }
)

export const removeContribution = createAsyncThunk(
    "contribution/remove",
    async ({id}) => {
        await ContributionService.removeContribution(id);
        return {id}
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
        },
        [updateAmountMoneyById.fulfilled]: (state, action) => {
            let index = state.contributions.findIndex(c => c.contributionMoney.id === action.payload.moneyId);
            if(index > -1){
                state.contributions[index].amountMoney = action.payload.amountMoney;
                state.contributions[index].contributionMoney.amountMoney = action.payload.amountMoney;
            } 
        }, 
        [updateStatusMoney.fulfilled]: (state, action) => {
            let index = state.contributions.findIndex(c => c.contributionMoney.id === action.payload.moneyId);
            if(index > -1){
                state.contributions[index].statusMoneyId = action.payload.statusId;
                state.contributions[index].contributionMoney.mcontributionStatus.id = action.payload.statusId;
            } 
        }, 
        [getArtifactsByContributionId.fulfilled]: (state, action) => {
            state.artifacts = [...action.payload];
        },
        [removeContribution.fulfilled]: (state, action) => {
            state.contributions = state.contributions.filter(c => c.id !== action.payload.id);
            console.log("idddddddđ: " + action.payload.id)
        },
    }
})

const {reducer} = contributionSlice;
export default reducer;
