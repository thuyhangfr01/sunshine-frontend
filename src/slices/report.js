import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ReportService from '../services/report.service'

const initialState = {
    constributions: [],
    payments: [],
    constributionArtifacts: [],
};

export const getListContributionsByUser = createAsyncThunk(
    "report/getListContributionsByUser", 
    async ({userId}) => {
        const res = await ReportService.getListContributionsByUser(userId);
        return res.data;
    }
)

export const getListContributionArtifactsByUser = createAsyncThunk(
    "report/getListContributionArtifactsByUser", 
    async ({userId}) => {
        const res = await ReportService.getListContributionArtifactsByUser(userId);
        return res.data;
    }
)

export const getListContributionsReport = createAsyncThunk(
    "report/getListContributionsReport", 
    async ({projectId, fromDate, toDate}) => {
        const res = await ReportService.getListContributionsReport(projectId, fromDate, toDate);
        return res.data;
    }
)

export const getListPaymentsReport = createAsyncThunk(
    "report/getListPaymentsReport", 
    async ({projectId, fromDate, toDate}) => {
        const res = await ReportService.getListPaymentsReport(projectId, fromDate, toDate);
        return res.data;
    }
)

const reportSlice = createSlice({
    name: "report",
    initialState,
    extraReducers: {
        [getListContributionsByUser.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getListContributionArtifactsByUser.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getListContributionsReport.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getListPaymentsReport.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    }
})

const {reducer} = reportSlice;
export default reducer;
