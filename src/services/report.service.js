import http from "../http-common";

const getListContributionsByUser = (userId) => {
    return http.get(`/reports/contributions/user?userId=${userId}`);
}

const getListContributionArtifactsByUser = (userId) => {
    return http.get(`/reports/contributions/artifacts/user?userId=${userId}`);
}

const getListContributionsReport = (projectId, fromDate, toDate) => {
    return http.get(`/reports/contributions?projectId=${projectId}&fromDate=${fromDate}&toDate=${toDate}`);
}

const getListPaymentsReport = (projectId, fromDate, toDate) => {
    return http.get(`/reports/payments?projectId=${projectId}&fromDate=${fromDate}&toDate=${toDate}`);
}

const ReportService = {
    getListContributionsByUser,
    getListContributionArtifactsByUser,
    getListContributionsReport,
    getListPaymentsReport
}

export default ReportService;