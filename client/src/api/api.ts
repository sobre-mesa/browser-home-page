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

export async function post(url: string, body: any){
    const host = 'http://localhost:8000';
    const formData = new URLSearchParams();
    formData.append('url', body.url);
    formData.append('description', body.description);
    formData.append('category', body.category);
    formData.append('image', body.image);
    return fetch(host + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })
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

export async function put(url: string, body: any){
    const host = 'http://localhost:8000';
    const formData = new URLSearchParams();
    formData.append('url', body.url);
    formData.append('description', body.description);
    formData.append('category', body.category);
    formData.append('image', body.image);
    return fetch(host + url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })
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

export async function del(url: string){
    const host = 'http://localhost:8000';
    return fetch(host + url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            if (response.ok) {
                // Process the successful response
                return true;
            } else {
                // Handle non-200 status codes
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}