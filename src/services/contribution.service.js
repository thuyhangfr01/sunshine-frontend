import http from "../http-common";

const createContribution = (userId, projectId, nickname, messages, amountMoney, contributionArtifacts) => {
    return http.post("/contribution", {userId, projectId, nickname, messages, amountMoney, contributionArtifacts});
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

const getArtifactsByContributionId = (id) => {
    return http.get(`/contribution/${id}/artifacts`);
}

const removeContribution = (id) => {
    return http.delete(`/contribution/${id}`);
}

const ContributionService = {
    createContribution,
    createArtifactByContribution,
    updateAmountMoneyById,
    updateStatusMoney,
    removeContribution,
    getArtifactsByContributionId
}

export default ContributionService;