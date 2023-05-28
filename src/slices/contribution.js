import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ContributionService from '../services/contribution.service'

const initialState = {
    contributions: [],
    contributionDonation: [],
    artifacts: [],
    contributionsByUser: [],
    contributionsByProject: []
};

export const getContributionsByProjectId = createAsyncThunk(
    "contribution/getContributionsByProjectId",
    async ({id}) => {
        const res = await ContributionService.getContributionsByProjectId(id);
        return res.data;
    }
)

export const getContributionsByProjectIdByStatus = createAsyncThunk(
    "contribution/getContributionsByProjectIdByStatus",
    async ({id}) => {
        const res = await ContributionService.getContributionsByProjectIdByStatus(id);
        return res.data;
    }
)

export const getContributionsByUserId = createAsyncThunk(
    "contribution/getContributionsByUserId",
    async ({id}) => {
        const res = await ContributionService.getContributionsByUserId(id);
        return res.data;
    }
)

export const getContributionById = createAsyncThunk(
    "contribution/getContributionById",
    async ({id}) => {
        const res = await ContributionService.getContributionById(id);
        return res.data;
    }
)

export const createContribution = createAsyncThunk(
    "contribution/createContribution", 
    async ({userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts}) => {
        const res = await ContributionService.createContribution(userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts);
        return res.data;
    }
)

export const importContribution = createAsyncThunk(
    "contribution/importContribution", 
    async (data) => {
        const res = await ContributionService.createContribution(data);
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
        [getContributionsByProjectId.fulfilled]: (state, action) => {
            state.contributionsByProject = [...action.payload];
        },
        [getContributionsByProjectIdByStatus.fulfilled]: (state, action) => {
            state.contributionsByProject = [...action.payload];
        },
        [getContributionsByUserId.fulfilled]: (state, action) => {
            state.contributionsByUser = [...action.payload];
        },
        [getContributionById.fulfilled]: (state, action) => {
            state.contributions = [...action.payload];
        },
        [createContribution.fulfilled]: (state, action) => {
            state.contributionDonation = [...state.contributions, action.payload];
        },
        [importContribution.fulfilled]: (state, action) => {
            state.contributions = [...state.contributions, action.payload];
        },
        [createArtifactByContribution.fulfilled]: (state, action) => {
            state.artifacts = action.payload;
        },
        [updateAmountMoneyById.fulfilled]: (state, action) => {
            let index = state.contributionDonation.findIndex(c => c.contributionMoney.id === action.payload.moneyId);
            if(index > -1){
                state.contributionDonation[index].amountMoney = action.payload.amountMoney;
                state.contributionDonation[index].contributionMoney.amountMoney = action.payload.amountMoney;
            } 
        }, 
        [updateStatusMoney.fulfilled]: (state, action) => {
            let index = state.contributionDonation.findIndex(c => c.contributionMoney.id === action.payload.moneyId);
            if(index > -1){
                state.contributionDonation[index].statusMoneyId = action.payload.statusId;
                state.contributionDonation[index].contributionMoney.mcontributionStatus.id = action.payload.statusId;
            } 
        }, 
        [getArtifactsByContributionId.fulfilled]: (state, action) => {
            state.artifacts = [...action.payload];
        },
        [removeContribution.fulfilled]: (state, action) => {
            state.contributionDonation = state.contributionDonation.filter(c => c.id !== action.payload.id);
            console.log("idddddddđ: " + action.payload.id)
        },
    }
})

const {reducer} = contributionSlice;
export default reducer;
