import http from "../http-common";

const createPayment = (amount) => {
    return http.get(`/payment/create_payment/${amount}`);
}

const getPaymentInfo = (vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_PayDate, vnp_ResponseCode, vnp_TransactionNo) => {
    return http.get("/payment/payment_info", {vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_PayDate, vnp_ResponseCode, vnp_TransactionNo});
}

const NameService = {
    createPayment,
    getPaymentInfo
}

export default NameService;