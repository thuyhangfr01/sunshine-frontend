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

const ReportService = {
    getAllFiles,
    getFilesByTitle,
    addFile
}

export default ReportService;