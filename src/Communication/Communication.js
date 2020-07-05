function Get(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => {
            console.log('error: ', error) //Here handle errors
            reject(error);
        });
    });  
}

export default {
    get: Get
};