import axios from 'axios';
import toast from '../configs/toast';
export const DISPLAY_OVERLAY = 'DISPLAY_OVERLAY';
export const SET_PAGE = 'SET_PAGE';

const displayOverlay = () => {
    return (dispatch) => {
        dispatch({
            type : DISPLAY_OVERLAY
        })
    }
}

const setDisplayPage = (page) => {
    return (dispatch) => {
        dispatch({
            type : SET_PAGE,
            page: page
        })
    }
}





export  {
    displayOverlay,
    setDisplayPage
    
}