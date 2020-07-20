import tokenService from './tokenService';

const BASE_URL = '/api/reports/notes';

function createNote(note) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        }),
        body: JSON.stringify(note)
    })
    .then(newNote => newNote.json())
}

// function deleteNote(note) {
//     return fetch(BASE_URL, {
//         method: 'DELETE',
//         headers: new Headers({
//             'Content-type': 'application/json',
//             'Authorization': `Bearer ${tokenService.getToken()}`
//         }),
//         body: JSON.stringify(note)
//     })
//     .then(deletedNote => deletedNote.json())
// }

export default {
    createNote,
    // deleteNote
}