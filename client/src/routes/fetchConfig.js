
const fetchObj = {
    fetchRequest : (endPoint, options) => {
        fetch(endPoint, options)
        .then(response => response.json())
        .then(json => {
          // access json.body here
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

