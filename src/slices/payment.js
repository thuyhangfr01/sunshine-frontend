import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import PaymentService from '../services/payment.service'

const initialState = [];

export const createPayment = createAsyncThunk(
    "payment/createPayment", 
    async ({amount}) => {
        const res = await PaymentService.createPayment(amount);
        return res.data;
    }
)

export const getPaymentInfo = createAsyncThunk(
    "payment/getPaymentInfo", 
    async ({vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_PayDate, vnp_ResponseCode, vnp_TransactionNo}) => {
        const res = await PaymentService.getPaymentInfo(vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_PayDate, vnp_ResponseCode, vnp_TransactionNo);
        return res.data;
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    extraReducers: {
        [createPayment.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getPaymentInfo.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    }
})

const {reducer} = paymentSlice;
export default reducer;
