function saveToken(token) {
    sessionStorage.setItem('token', token);
}

function getToken() {
    return sessionStorage.getItem('token');
}

export {saveToken, getToken};