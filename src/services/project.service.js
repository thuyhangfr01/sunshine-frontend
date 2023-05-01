import http from "../http-common";

const getAll = params => {
    return http.get("/allProjects", {params});
};

const getLatestProject = () => {
    return http.get("/latestProjects");
}

const get = id => {
    return http.get(`/project/${id}`)
}

const findByType = id => {
    return http.get("/type/projects", {id})
}

const findByStatus = id => {
    return http.get("/status/projects", {id})
}

const ProjectService = {
    getAll,
    getLatestProject,
    get,
    findByType,
    findByStatus
}

export default ProjectService;