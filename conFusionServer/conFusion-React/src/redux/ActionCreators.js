import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (locationId,rating,author,comment) => (dispatch) => {
    const newComment = {
        locationId: locationId,
        rating:rating,
        author:author,
        comment:comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method:'POST',
        body: JSON.stringify(newComment),
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok){
                return response;
            } else {
                var error =  new Error('Error '+response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('Post comments ',error.message);
        alert('Your comment could not be posted\nError: '+error.message);
    });
        
}

export const fetchLocations = () => (dispatch) => {
    dispatch(locationsLoading(true));

    return fetch(baseUrl + 'home')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                var error =  new Error('Error '+response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(locations => dispatch(addLocations(locations)))
        .catch(error => dispatch(locationsFailed(error.message)));
}

export const locationsLoading = ()=> ({
    type: ActionTypes.LOCATIONS_LOADING
});

export const locationsFailed = (errmess) => ({
    type: ActionTypes.LOCATIONS_FAILED,
    payload: errmess
});

export const addLocations = (locations) => ({
    type: ActionTypes.ADD_LOCATIONS,
    payload: locations
});

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                var error =  new Error('Error '+response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })    
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType: contactType,
        message:message
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'about', {
        method:'POST',
        body: JSON.stringify(newFeedback),
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok){
                return response;
            } else {
                var error =  new Error('Error '+response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {dispatch(addFeedback(response));
        alert('Thank you for your feedback!\n'+JSON.stringify(response))})
        .catch(error => { console.log('Post feedback ',error.message);
        alert('Your Feedback could not be posted\nError: '+error.message);
    });
        
}
