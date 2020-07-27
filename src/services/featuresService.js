import tokenService from './tokenService';

const BASE_URL = '/api/reports/features';

function createFeature(feature) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }),
        body: JSON.stringify(feature)
    })
    .then(newFeature => newFeature.json())
}

export default {
    createFeature,
}