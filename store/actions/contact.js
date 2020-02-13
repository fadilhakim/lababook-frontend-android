import {
    CONTACT_CREATE,
    CONTACT_FETCH,
    CONTACT_DELETE,
    UPDATE_BOOK_ID,
    UPDATE_USER_ID,
    UPDATE_PHONE_NUMBER,
    UPDATE_NAME
    

} from '../actionTypes/contact'

import { SHOW_LOADING, HIDE_LOADING } from '../actionTypes/loading'
import {
    contact
} from '../../libs/request'
import { showErrorBottom } from '../../libs/errorHandler'
// import syncActions from '../../libs/syncActions'

export function updatePhoneNumber (newPhoneNumber) {
    return {
        type: UPDATE_PHONE_NUMBER,
        phoneNumber: newPhoneNumber
    }
}

export function updateBookId (newBookId) {
    return {
        type: UPDATE_BOOK_ID,
        bookId: newBookId
    }
}

export function updateName (newName) {
    return {
        type:UPDATE_NAME,
        name:newName
    }
}

export function updateUserId(newUserId) {
    return {
        type:UPDATE_USER_ID,
        name:newUserId
    }
}

export function fetchContact(bookId) {
    return function(dispatch){
        contact.fetchContact(bookId)
        .then(res => {
            dispatch({
                type:CONTACT_FETCH,
                contacts:res.contacts
            })
        })
        .catch(error => {
            console.log(error.response.data)
            showErrorBottom(error.response.data.message || 'server error')
        })
    }
}

export function createContact(data) {
    return function(dispatch){
        contact.createContact(data)
        .then(res => {
            dispatch({
                type:CONTACT_CREATE,
                contacts:res.contacts
            })
        })
        .catch(error => {
            console.log(error.response.data)
            showErrorBottom(error.response.data.message || 'server error')
        })
    }
}

export function deleteContact(contactId) {
    return function(dispatch){
        contact.deleteContact(data)
        .then(res => {
            dispatch({
                type:CONTACT_DELETE,
                contacts:res.contacts
            })
        })
        .catch=(error => {
            console.log(error.response.data)
            showErrorBottom(error.response.data.message || 'server error')
        })
    }
}