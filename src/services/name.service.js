import http from "../http-common";

const getListProjectName = () => {
    return http.get("/listProjectName");
}


const NameService = {
    getListProjectName
}

export default NameService;