import axios from "axios"

import { api } from '../config/url'

export default class ContactAPI {
    
    getContacts(params) {
        console.log(api+"/contacts")
        return axios.get(api+"/contacts",{
            params:{
                bookId:params.bookId, 
                sort:params.sort,
                filter:params.filter
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    createContact(data) {

        const dt = {
            name:data.name,
            phoneNumber:data.phoneNumber,
            userId:data.userId,
            bookId:data.bookId,
        }

        //console.log("check => ",api+"/contact/create", dt)

        return axios.post(api+"/contact/create",dt,{
            'Content-Type': 'application/json'
        })
    }

    deleteContact() {
        
    }

}