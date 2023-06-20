import { APIResponse, APIResponseWithArray, EmptyResponse } from '../models/API';

export async function get(url: string){
    const host = 'http://localhost:8000';
    return fetch(host + url)
        .then((response) => {
            if (response.ok) {
                // Process the successful response
                return response.json();
            } else {
                // Handle non-200 status codes
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });

}