import http from "../http-common";

const getAllFormVolunteer = () => {
    return http.get("/latestFormVolunteer")
}
const getAllFormVolunteerByProjectId = (id) => {
    return http.get(`/latestFormVolunteer/project/${id}`)
}
const createFormVolunteer = (email, phone, projectId) => {
    return http.post("/formVolunteer", {email, phone, projectId});
}
const updateStatusFormVolunteer = (id, fullName, email, phone, projectId, statusId) => {
    return http.put(`/formVolunteer/${id}/status`, {id, fullName, email, phone, projectId, statusId});
}

const getAllFormHelp = () => {
    return http.get("/latestFormHelp")
}
const getAllFormHelpByUser = (fullName) => {
    return http.get(`/formHelp/user?fullName=${fullName}`)
}
const createFormHelp = (fullName, email, phone, title, contents) => {
    return http.post("/formHelp", {fullName, email, phone, title, contents});
}
const createImageByForm = (id, name) => {
    return http.post(`/formHelp/${id}/image`, {name});
}
const updateStatusFormHelp = (id, fullName, email, phone, title, contents, statusId) => {
    return http.put(`/formHelp/${id}/status`, {fullName, email, phone, title, contents, statusId});
}

const FormService = {
    getAllFormVolunteer,
    getAllFormVolunteerByProjectId,
    createFormVolunteer,
    updateStatusFormVolunteer,
    getAllFormHelp,
    getAllFormHelpByUser,
    createFormHelp,
    createImageByForm,
    updateStatusFormHelp
}

export default FormService;