import {fetchObj} from './fetchConfig'


    // const login = fetchObj.fetchRequest('/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({name : "some thing"})
    //
    //
    // })

async function login(data) {
    console.log('xxxxx fetchReq login')
    const apiObject = fetchObj.fetchRequest('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name : "some thing"})


    })
    const response = await apiObject;
    return response;
}

export default {
    login
}

