import * as ActionTypes from './ActionTypes';

export const Locations = (state = {
        isLoading: true, 
        errMess: null,
        locations: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_LOCATIONS:
            return {...state, isLoading:false, errMess:null, locations: action.payload};

        case ActionTypes.LOCATIONS_LOADING:
            return {...state, isLoading:true, errMess:null, locations: []};

        case ActionTypes.LOCATIONS_FAILED:
            return {...state, isLoading:false,errMess:action.payload,locations:[]};

        default:
            return state;
    }
}