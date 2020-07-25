import tokenService from './tokenService';

const BASE_URL = '/api/mapbox';

function getMapBoxAccessToken() {
    return fetch(BASE_URL, {
        headers: new Headers ({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        })
    })
    .then(plants => plants.json());
}

export default {
    getMapBoxAccessToken
}