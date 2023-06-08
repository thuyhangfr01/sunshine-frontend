import http from "../http-common";

const getListContributionArtifacts = () => {
    return http.get("/contribution/artifacts");
}

const getListContributionArtifactsByUserId = (userId) => {
    return http.get(`/contribution/artifacts/user/${userId}`);
}

const getArtifactsByContributionId = (id) => {
    return http.get(`/contribution/${id}/artifacts`);
}

const updateArtifactStatus = (artId, artifactId, receivedAmount, statusId) => {
    return http.put(`contribution/artifact/${artId}`, {artifactId, receivedAmount, statusId});
}

const ArtifactService = {
    getListContributionArtifacts,
    getListContributionArtifactsByUserId,
    getArtifactsByContributionId,
    updateArtifactStatus
}

export default ArtifactService;