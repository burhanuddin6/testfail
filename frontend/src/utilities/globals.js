export const SOFTWARE_TITLE = 'TCMS';

// base url
export const LOCAL_URL = "http://localhost:8000/";


// base verification url
export const LOCAL_VERIFY_EMAIL_URL = `${LOCAL_URL}/api/tcms/verify-email/`;

// session token
let token = null;

export const setToken = (newToken) => {
    token = newToken;
};

export const getToken = () => {
    return token;
};


export const setProjectInfo = (newID, newName) => {
    sessionStorage.setItem("projectID", newID);
    sessionStorage.setItem("projectName", newName);
};

export const getProjectID = () => {
    return sessionStorage.getItem("projectID");
};

export const getProjectName = () => {
    return sessionStorage.getItem("projectName");
};

