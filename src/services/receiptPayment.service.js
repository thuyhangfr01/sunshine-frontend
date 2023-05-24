import http from "../http-common";

const getListReceiptPayment = (projectId1, projectId2, fromDate1, toDate1, fromDate2, toDate2) => {
    return http.get(`/unionByProjectIdByDate/?projectId1=${projectId1}&projectId2=${projectId2}&fromDate1=${fromDate1}&toDate1=${toDate1}&fromDate2=${fromDate2}&toDate2=${toDate2}`);
}

const ReceiptPaymentService = {
    getListReceiptPayment
}

export default ReceiptPaymentService;