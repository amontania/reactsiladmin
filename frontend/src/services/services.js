import { fetchWrapper } from "./fetch_wrapper";

export const services = {
  getAbsenceLists,
  getAllCombo,
  getCostCenters,
  getWBS,
  getCommitments,
  getCities,

  createAbsence,
  getAbsence,

  /* Launchpad notifications */
  getLnpApprovals,
  getLnpApprovalsSG,
};

function getAbsenceLists(url, token, login) {
  return fetchWrapper.get(`${url}/lists`, token, login);
}

function getAllCombo(url, pOperation, pId) {
  return fetchWrapper.post(
    `${url}`,
    {
      pOperation: pOperation,
      pId: pId,
    },
    true
  );
}

function getCostCenters(url, token, login, filter) {
  return fetchWrapper.post(
    `${url}/costcenter`,
    token,
    login,
    { filter: filter },
    true
  );
}

function getWBS(url, token, login, filter) {
  return fetchWrapper.post(
    `${url}/wbs`,
    token,
    login,
    { filter: filter },
    true
  );
}

function getCommitments(url, token, login, filter) {
  return fetchWrapper.post(
    `${url}/commitments`,
    token,
    login,
    { filter: filter },
    true
  );
}

function getCities(url, token, login, filter) {
  return fetchWrapper.post(
    `${url}/cities`,
    token,
    login,
    { country: filter, department: "", filter: "" },
    true
  );
}

function createAbsence(url, token, login, body) {
  console.log(body);
  console.log(token);
  console.log(login);
  console.log(url);
  return fetchWrapper.post(url, token, login, body);
}

function getAbsence(url, token, login, body) {
  console.log(body);
  return fetchWrapper.post(
    `${url}/search`,
    token,
    login,
    body //TODO
  );
}

/* Launchpad notifications */
function getLnpApprovals(url, token, login) {
  return 0;
}

function getLnpApprovalsSG(url, token, login) {
  return 0;
}
