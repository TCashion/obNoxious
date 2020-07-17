import tokenService from './tokenService';
const BASE_URL = '/api/users/';

function signup(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST', 
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Email already taken!')
    })
    .then(({token}) => tokenService.setTokenInLocalStorage(token));
}

function login(creds) {
    return fetch(BASE_URL + 'login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }), 
        body: JSON.stringify(creds)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Invalid credentials!')
    })
    .then(({ token }) => tokenService.setTokenInLocalStorage(token));
}

function updatePassword(creds) {
    return fetch(BASE_URL + 'password', {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }), 
        body: JSON.stringify(creds)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Invalid credentials!')
    })
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.removeToken();
}

export default {
    getUser,
    logout, 
    login, 
    updatePassword,
    signup
};