import http from "../http-common";

const getAllFiles = () => {
    return http.get("/reports");
}

const getFilesByTitle = (title) => {
    return http.get(`/reports/title?title=${title}`);
}

const addFile = (title, nameImg, urlImg) => {
    return http.post(`/report?nameImg=${nameImg}&title=${title}&urlImg=${urlImg}`);
}

const getListContributionsReport = (projectId, fromDate, toDate) => {
    return http.get(`/reports/contributions?projectId=${projectId}&fromDate=${fromDate}&toDate=${toDate}`);
}

const getListPaymentsReport = (projectId, fromDate, toDate) => {
    return http.get(`/reports/payments?projectId=${projectId}&fromDate=${fromDate}&toDate=${toDate}`);
}

const ReportService = {
    getAllFiles,
    getFilesByTitle,
    addFile,
    getListContributionsReport,
    getListPaymentsReport
}

export default ReportService;