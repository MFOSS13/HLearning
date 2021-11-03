import {  
  
    ORDER_BY_NAME,
    ORDER_BY_SCORE,
    ORDER_BY_PRICE,

} from "../actions/constants.js";

const initialState = {
    
    setAllCourses: [],

};

const ordersReducer = (state = initialState, action) => {

    switch(action.type){
        case ORDER_BY_NAME : {
            return {
                ...state,
                setAllCourses: action.payload
            }
        }

        case ORDER_BY_SCORE: {
            return {
                ...state, 
                setAllCourses: action.payload
            }
        }

        case ORDER_BY_PRICE: {
            return {
                ...state, 
                setAllCourses: action.payload
            }
        }
    }
}

export default ordersReducer;