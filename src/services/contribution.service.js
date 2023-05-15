import http from "../http-common";

const createContribution = (userId, projectId, nickname, messages, amountMoney) => {
    return http.post("/contribution", {userId, projectId, nickname, messages, amountMoney});
}

const createArtifactByContribution = (id, artifactName, donatedAmount, calculationUnit) => {
    return http.post(`/contribution/${id}/artifacts`, {artifactName, donatedAmount, calculationUnit});
}

const ContributionService = {
    createContribution,
    createArtifactByContribution
}

export default ContributionService;