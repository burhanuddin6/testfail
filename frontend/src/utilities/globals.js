export const SOFTWARE_TITLE = 'TCMS';

// base url
export const LOCAL_URL = "http://localhost:8000/";
export const GIT_URL = "https://organic-orbit-p47g4pqqrqj36rvv-8000.app.github.dev/";


// base verification url
export const LOCAL_VERIFY_EMAIL_URL = "http://127.0.0.1:8000/api/tcms/verify-email/";
export const GIT_VERIFY_EMAIL_URL = "https://organic-orbit-p47g4pqqrqj36rvv-8000.app.github.dev/api/tcms/verify-email/";

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

