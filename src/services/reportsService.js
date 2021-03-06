import tokenService from './tokenService';

const BASE_URL = '/api/reports';

function getReports() {
    return fetch(BASE_URL, {
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        })
    })
    .then(reports => reports.json());
}

function createReport(report) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }),
        body: JSON.stringify(report)
    })
    .then(newReport => newReport.json())
}

function deleteReport(report) {
    return fetch(BASE_URL, {
        method: 'DELETE',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }),
        body: JSON.stringify(report)
    })
    .then(deletedReport => deletedReport.json())
}

function getPlantReportedLocations(plantId) {
    return fetch(`${BASE_URL}/plant/${plantId}`, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        })
    })
    .then(locations => locations.json())
}

function updateReport(report) {
    return fetch(BASE_URL, {
        method: 'PUT',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }),
        body: JSON.stringify(report)
    })
    .then(updatedReport => updatedReport.json());
}

export default {
    createReport,
    getPlantReportedLocations,
    getReports,
    deleteReport,
    updateReport
}