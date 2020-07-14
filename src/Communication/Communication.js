async function Get(url) {
    let results;

    try {
        const response = await fetch(url);
        results = response.json();
    } catch (err) {
        throw new Error('Failed to fetch', err)
    }
    return results
}

export default {
    get: Get
};
