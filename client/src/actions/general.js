import axios from 'axios';
export const DISPLAY = 'DISPLAY';
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE';

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
                
            }else{
                
            }
        });
    }
}




export  {
    setDisplay,
    setPrevPage,
    getLocations
    
}