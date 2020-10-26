
const fetchObj = {
    fetchRequest : (endPoint, options) => {
        console.log('xxxxx fetchRequest')
        fetch(endPoint, options).then((res) => res.json())
            .then((data) => console.log("vvvvvv response : ", data))
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err))
    }
};

export {
    fetchObj
}

