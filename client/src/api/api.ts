export async function get(url: string){
    const host = 'http://localhost:8000';
    return fetch(host + url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });

}

export async function post(url: string, formData: any){
    const host = 'http://localhost:8000';
    return fetch(host + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}

export async function put(url: string, formData: any){
    const host = 'http://localhost:8000';
    return fetch(host + url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
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
                return true;
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}