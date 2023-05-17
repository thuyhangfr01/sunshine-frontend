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

// const getLatestProjectByName = name => {
//     return http.get(`/latestProject?name=${name}}`);
// }

const getTop5LatestProject = () => {
    return http.get("/top5LatestProject");
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

const getTotalMoneyByProjectId = (id) => {
    return http.get(`/project/${id}/totalMoney`);
};

const createProject = (name, details, typeId, numVolunteers, startTime, endTime, holdTime, position) => {
    return http.post("/project", {name, details, typeId, numVolunteers, startTime, endTime, holdTime, position});
}

const createMoneyByProject = (id, minMoney) => {
    return http.post(`/project/${id}/money`, minMoney);
}

const createArtifactByProject = (id, artifactName, minQuantity, calculationUnit) => {
    return http.post(`/project/${id}/artifact`, {artifactName, minQuantity, calculationUnit});
}

const createImageByProject = (id, name) => {
    return http.post(`/project/${id}/image`, {name});
}

const createProofByProject = (id, name) => {
    return http.post(`/project/${id}/proof`, {name});
}

const updateProject = (id, name, details, typeId, statusId, numVolunteers, startTime, endTime, holdTime, position) => {
    return http.put(`/project/${id}`, {name, details, typeId, numVolunteers, statusId, startTime, endTime, holdTime, position})
}

const updateMoneyById = (moneyId, minMoney) => {
    return http.put(`/project/money/${moneyId}`, {minMoney})
}

const updateArtifactById = (artifactId, artifactName, minQuantity, calculationUnit) => {
    return http.put(`/project/artifact/${artifactId}`, {artifactName, minQuantity, calculationUnit})
}

const ProjectService = {
    getAllProj,
    getAll,
    getLatestProject,
    getTop5LatestProject,
    get,
    findByType,
    findByStatus,
    getAllImages,
    getAllMoney,
    getAllArtifacts,
    getAllProofs,
    getTotalMoneyByProjectId,
    createProject,
    createMoneyByProject,
    createArtifactByProject,
    createImageByProject,
    createProofByProject,
    updateProject,
    updateMoneyById,
    updateArtifactById
}

export default ProjectService;