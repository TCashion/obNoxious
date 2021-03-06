import tokenService from './tokenService';

const BASE_URL = '/api/plants';

function getPlants() {
    return fetch(BASE_URL, {
        headers: new Headers ({
            'Content-type': 'application/json',
        })
    })
    .then(plants => plants.json());
}

function createPlant(plant) {
    return fetch(BASE_URL, {
        method: 'POST', 
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }), 
        body: JSON.stringify(plant)
    })
    .then(newPlant => newPlant.json());
}

function getOne(scientificName) {
    return fetch(`${BASE_URL}/${scientificName}`, {
        headers: new Headers ({
            'Content-type': 'application/json',
        }),
    })
    .then(plant => plant.json());
}

export default {
    createPlant,
    getPlants,
    getOne
}