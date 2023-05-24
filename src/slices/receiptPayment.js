import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ReceiptPaymentService from '../services/receiptPayment.service';

const initialState = {
    receiptPayment: []
};

export const getListReceiptPayment = createAsyncThunk(
    "receiptPayment/getListReceiptPayment", 
    async ({projectId1, projectId2, fromDate1, toDate1, fromDate2, toDate2}) => {
        const res = await ReceiptPaymentService.getListReceiptPayment(projectId1, projectId2, fromDate1, toDate1, fromDate2, toDate2);
        return res.data;
    }
)


const receiptPaymentSlice = createSlice({
    name: "receiptPayment",
    initialState,
    extraReducers: {
        [getListReceiptPayment.fulfilled]: (state, action) => {
            state.receiptPayment = [...action.payload];
        }
    }
})

const {reducer} = receiptPaymentSlice;
export default reducer;
