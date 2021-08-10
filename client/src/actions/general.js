import axios from 'axios';
export const DISPLAY = 'DISPLAY';
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
export const ALL_LOCATIONS = 'ALL_LOCATIONS';
export const ALL_INDUSTRIES = 'ALL_INDUSTRIES';
export const ALL_SALARIES = 'ALL_SALARIES';

const setDisplay = (val) => {
    return {
        type : DISPLAY,
        val : val
    }
};

const setPrevPage = (page) => {
    return {
        type : PREVIOUS_PAGE,
        page: page
    }
}

const getLocations = () => {
        return(dispatch) => {
            axios.get('/general/locations',{
            withCredentials: true,
            credentials: "same-origin", 
        }).then((res) => {
            if(res.data && res.data.success){
                dispatch({
                    type : ALL_LOCATIONS,
                    locations : res.data.data
                })
            }
        });
    }
}

const getIndustries = () => {
    return(dispatch) => {
        axios.get('/general/industries',{
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res.data && res.data.success){
            dispatch({
                type : ALL_INDUSTRIES,
                industries : res.data.data
            })
        }
    });
    }
}

const getSalaries = () => {
    return(dispatch) => {
        axios.get('/general/salaries',{
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res.data && res.data.success){
            dispatch({
                type : ALL_SALARIES,
                salaries : res.data.data
            })
        }
    });
    }
}

const addNewIndustry = (data) => {
    return (dispatch) => {
        axios.post('/general/add-industry',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch(getIndustries());
            }
          
        });
    }
}

const addNewLocation = (data) => {
    return (dispatch) => {
        axios.post('/general/add-location',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch(getLocations());
            }
          
        });
    }
}

export  {
    setDisplay,
    setPrevPage,
    getLocations,
    getIndustries,
    getSalaries,
    addNewIndustry,
    addNewLocation
    
}