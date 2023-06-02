import http from "../http-common";

const getContributionsByProjectId = (id) => {
    return http.get(`/contribution/project/${id}`);
}

const getContributionsByProjectIdByStatus = (id) => {
    return http.get(`/contribution/project/${id}/status`);
}

const getContributionsByUserId = (id) => {
    return http.get(`/contribution/user/${id}`);
}

const getContributionById = (id) => {
    return http.get(`/contribution/${id}`);
}

const createContribution = (userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts) => {
    return http.post("/contribution", {userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts});
}

const importContribution = (userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts) => {
    return http.post("/contributionImport", {userId, projectId, nickname, messages, amountMoney, createdAt, paymentType, contributionArtifacts});
}

const createArtifactByContribution = (id, artifactName, donatedAmount, calculationUnit) => {
    return http.post(`/contribution/${id}/artifacts`, {artifactName, donatedAmount, calculationUnit});
}

const updateAmountMoneyById = (mId, amountMoney, moneyId) => {
    return http.put(`/contribution/amountMoney/${mId}`, {amountMoney, moneyId});
}

const updateStatusMoney = (moneyId, statusId) => {
    return http.put(`/contribution/money/${moneyId}/status`, {statusId});
}

const getListContributionArtifacts = () => {
    return http.get("/contribution/artifacts");
}

const getArtifactsByContributionId = (id) => {
    return http.get(`/contribution/${id}/artifacts`);
}

const updateArtifactStatus = (artId, artifactId, receivedAmount, statusId) => {
    return http.put(`contribution/artifact/${artId}`, {artifactId, receivedAmount, statusId});
}

const removeContribution = (id) => {
    return http.delete(`/contribution/${id}`);
}

const ContributionService = {
    createContribution,
    importContribution,
    createArtifactByContribution,
    updateAmountMoneyById,
    updateStatusMoney,
    updateArtifactStatus,
    removeContribution,
    getListContributionArtifacts,
    getArtifactsByContributionId,
    getContributionsByProjectId,
    getContributionsByProjectIdByStatus,
    getContributionsByUserId,
    getContributionById
}

export default ContributionService;