import { apiUrl } from '../config';

const url = apiUrl + '/properties';
// const url = apiUrl + '&place_name=';

export default {
    fetchAllProperties() {
        console.log(url);
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        }).catch((error) => {
            return Promise.reject(error.message);
        });
    },
    fetchPropertyDetails(propertyId) {
        let uri = url + '/' + propertyId;
        return fetch(uri).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        }).catch((error) => {
            return Promise.reject(error.message);
        });
    },
    searchProperties(searchTerm) {
        let uri = url + '/search/' + searchTerm;
        // let uri = url + searchTerm;
        console.log(uri);
        return fetch(uri).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        }).catch((error) => {
            return Promise.reject(error.message);
        });
    }
};