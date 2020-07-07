import { Button, notification, Space } from 'antd';

async function Get(url) {
    let results;

    try {
        const response = await fetch(url);
        results = response.json();
    } catch (err) {
        throw new Error('Failed to fetch', err)
        // notification['error']({})
        // notification.error({
        //     message: 'Notification Title',
        //     description:
        //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        //   });
    }
    return results
}

export default {
    get: Get
};


// function Get(url) {
//     return new Promise((resolve, reject) => {
//         fetch(url)
//         .then(response => response.json())
//         .then(data => resolve(data))
//         .catch(error => {
//             console.log('error: ', error) //Here handle errors
//             reject(error);
//         });
//     });  
// }

