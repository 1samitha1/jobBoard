
const fetchObj = {
    fetchRequest : (endPoint, options) => {
        console.log('xxxxx fetchRequest')
        fetch(endPoint, options)
        .then(response => response.json())
        .then(json => {
          console.log('vvvvvv parsed json', json) // access json.body here
        })
            // .then((data) => )
            // // .then((data) => {
            // //     return data;
            // // })
            // .catch((err) => console.log(err))
    }
};

export {
    fetchObj
}

