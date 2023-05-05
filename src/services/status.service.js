import http from "../http-common";

//lay tat ca status
const getAllStatus = () => {
    return http.get("/project/status");
}

const StatusService = {
    getAllStatus
}

export default StatusService;