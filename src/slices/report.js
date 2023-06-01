import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ReportService from '../services/report.service'

const initialState = {
    files: null,
    reports: [],
    constributions: [],
    payments: [],
};

export const getAllFiles = createAsyncThunk(
    "file/getAllFiles", 
    async () => {
        const res = await ReportService.getAllFiles();
        return res.data;
    }
)
export const getFilesByTitle = createAsyncThunk(
    "file/getFilesByTitle", 
    async ({title}) => {
        const res = await ReportService.getFilesByTitle(title);
        return res.data;
    }
)
export const addFile = createAsyncThunk(
    "file/addFile", 
    async ({title, nameImg, urlImg}) => {
        const res = await ReportService.addFile(title, nameImg, urlImg);
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
        [getAllFiles.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getFilesByTitle.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [addFile.fulfilled]: (state, action) => {
            state.reports = action.payload;
        },
        [getListContributionsReport.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getListPaymentsReport.fulfilled]: (state, action) => {
            return [...action.payload];
        }
    }
})

const {reducer} = reportSlice;
export default reducer;
