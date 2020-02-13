import axios from "axios";

import { api } from '../../config/url'

export default class Contact {

    async listContact(bookId) {
        const response =  await axios.get(api+"/contacts",{
            params:{
                bookId:bookId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response
    }

    async addContact(data) {

        const dt = {
            name:data.name,
            phoneNumber:data.phoneNumber,
            userId:data.userId,
            bookId:data.bookId,
        }

        const response = await axios.post(api+"/contact/create",{
            data:dt,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response
    }

    async deleteContact(contactId) {

        const response = axios.delete(api+"/contact/delete",{
            params:{
                contactId:contactId
            },headers: {
                'Content-Type': 'application/json'
            }
        })

        return response
    }

}