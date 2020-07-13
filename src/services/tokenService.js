function setTokenInLocalStorage(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

export default {
    setTokenInLocalStorage,
}