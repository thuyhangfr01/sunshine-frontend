import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FormService from '../services/form.service'

const initialState = {
    formVolunteer: [],
    formHelp: [],
    images: []
};

export const getAllFormVolunteer = createAsyncThunk(
    "form/getAllFormVolunteer", 
    async () => {
        const res = await FormService.getAllFormVolunteer();
        return res.data;
    }
)
export const getAllFormVolunteerByProjectId = createAsyncThunk(
    "form/getAllFormVolunteerByProjectId", 
    async ({id}) => {
        const res = await FormService.getAllFormVolunteerByProjectId(id);
        return res.data;
    }
)
export const createFormVolunteer = createAsyncThunk(
    "form/createFormVolunteer", 
    async ({fullName, email, phone, projectId}) => {
        const res = await FormService.createFormVolunteer(fullName, email, phone, projectId);
        return res.data;
    }
)
export const updateStatusFormVolunteer= createAsyncThunk(
    "form/updateStatusFormVolunteer", 
    async ({id, fullName, email, phone, projectId, statusId}) => {
        const res = await FormService.updateStatusFormVolunteer(id, fullName, email, phone, projectId, statusId);
        return res.data;
    }
)

export const getAllFormHelp= createAsyncThunk(
    "form/getAllFormHelp", 
    async () => {
        const res = await FormService.getAllFormHelp();
        return res.data;
    }
)
export const getAllFormHelpByUser = createAsyncThunk(
    "form/getAllFormHelpByUser", 
    async ({fullName}) => {
        const res = await FormService.getAllFormHelpByUser(fullName);
        return res.data;
    }
)
export const createFormHelp = createAsyncThunk(
    "form/createFormHelp", 
    async ({fullName, email, phone, title, contents}) => {
        const res = await FormService.createFormHelp(fullName, email, phone, title, contents);
        return res.data;
    }
)
export const createImageByForm= createAsyncThunk(
    "form/createImageByForm", 
    async ({id, name}) => {
        const res = await FormService.createImageByForm(id, name);
        return res.data;
    }
)
export const updateStatusFormHelp= createAsyncThunk(
    "form/updateStatusFormHelp", 
    async ({id, fullName, email, phone, title, contents, statusId}) => {
        const res = await FormService.updateStatusFormHelp(id, fullName, email, phone, title, contents, statusId);
        return res.data;
    }
)

const formSlice = createSlice({
    name: "form",
    initialState,
    extraReducers: {
        [getAllFormVolunteer.fulfilled]: (state, action) => {
            state.formVolunteer = [...action.payload];
        },
        [getAllFormVolunteerByProjectId.fulfilled]: (state, action) => {
            state.formVolunteer = [...action.payload];
        },
        [createFormVolunteer.fulfilled]: (state, action) => {
            state.formVolunteer = action.payload;
        },
        [updateStatusFormVolunteer.fulfilled]: (state, action) => {
            const index = state.formVolunteer.findIndex(a => a.id === action.payload.id);
            state.formVolunteer[index] = {
                ...state.formVolunteer[index],
                ...action.payload
            }
        },
        [getAllFormHelp.fulfilled]: (state, action) => {
            state.formHelp = [...action.payload];
        },
        [getAllFormHelpByUser.fulfilled]: (state, action) => {
            state.formHelp = [...action.payload];
        },
        [createFormHelp.fulfilled]: (state, action) => {
            state.formHelp = action.payload;
        },
        [createImageByForm.fulfilled]: (state, action) => {
            state.images.push(action.payload);
        },
        [updateStatusFormHelp.fulfilled]: (state, action) => {
            const index = state.formHelp.findIndex(a => a.id === action.payload.id);
            state.formHelp[index] = {
                ...state.formHelp[index],
                ...action.payload
            }
        }
    }
})

const {reducer} = formSlice;
export default reducer;
