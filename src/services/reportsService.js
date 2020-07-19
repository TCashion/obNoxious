import tokenService from './tokenService';

const BASE_URL = '/api/reports';

function getReports() {
    return fetch(BASE_URL, {
        headers: new Headers({
            'Content-type': 'application/json',
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

export default {
    createReport,
    getReports,
}