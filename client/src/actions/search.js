export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA';

const setSearchCriteria = (values) => {
    console.log('vvvv values :', values)
    return {
        type : SET_SEARCH_CRITERIA,
        values : values
    }
};


export  {
    setSearchCriteria,
    
}