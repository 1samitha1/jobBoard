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

 function register(data) {
    // const apiObject = fetchObj.fetchRequest('/user/register',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(data)


    // })
    // const response = await apiObject;
    // return response;

    fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)})
    .then(response =>  response.json())
    .then(json => {
     
    })
}

// function test(date){
//     fetch('/user/register',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(data)


//     })
//     .then(response => response.json())
//         .then(json => {
//           console.log('vvvvvv parsed json', json) // access json.body here
//         })
// }

export default {
    login,
    register,
    // test
}

