import http from "../http-common";

const getAllProj = () => {
    return http.get("/allProjects");
};

const getAll = params => {
    return http.get("/all", {params});
};

const getLatestProject = () => {
    return http.get("/latestProject");
}

const get = id => {
    return http.get(`/project/${id}`)
}

const findByType = params => {
    return http.get("/type/projects", {params})
}

const findByStatus = params => {
    return http.get("/status/projects", {params})
}

const getAllImages = (id) => {
    return http.get(`/project/${id}/images`);
};

const getAllMoney = (id) => {
    return http.get(`/project/${id}/money`);
};

const getAllArtifacts = (id) => {
    return http.get(`/project/${id}/artifacts`);
};

const getAllProofs = (id) => {
    return http.get(`/project/${id}/proofs`);
};

const ProjectService = {
    getAllProj,
    getAll,
    getLatestProject,
    get,
    findByType,
    findByStatus,
    getAllImages,
    getAllMoney,
    getAllArtifacts,
    getAllProofs
}

export default ProjectService;