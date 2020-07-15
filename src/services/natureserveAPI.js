const BASE_URL = 'https://explorer.natureserve.org/api/data/speciesSearch';

export function getPlantInfo(searchTerm) {
    const requestBody = {
        'criteriaType': 'species',
        'textCriteria': [{
            'paramType': 'quickSearch',
            'searchToken': `${searchTerm}`
        }],
        'statusCriteria': [],
        'locationCriteria': [{ 'nation': 'US', 'paramType': 'nation' }],
        'pagingOptions': {
            'page': '0',
            'recordsPerPage': '1'
        },
        'recordSubtypeCriteria': [],
        'modifiedSince': null,
        'speciesTaxonomyCriteria': [{ 'informalTaxonomy': 'Plants', 'paramType': 'informalTaxonomy' }]
    };

    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(data => console.log(data.results[0]))
    .catch((error) => {
        console.error('Error:', error);
    });
};