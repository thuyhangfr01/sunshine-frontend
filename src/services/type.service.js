import http from "../http-common";

//lay tat ca type project
const getAllType = () => {
    return http.get("/project/types");
}; 

const TypeService = {
    getAllType
}

export default TypeService;