import axios from "axios"

import { api } from '../config/url'

export default class TransactionAPI {
    
    getTransaction(bookId) {
       
        return axios.get(api+"/transactions",{
            params:{
                bookId:bookId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getTransactionByContact(contactId) {
        return axios.get(api+"/transaction/contact",{
            params:{
                contactId:contactId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    createTransactions(data) {

        const dt = {
            type:data.type,
            amount:data.amount,
            description:data.description,
            userId:data.userId,
            contactId:data.contactId,
            dueDate:data.dueDate
        }

        //console.log("check => ",api+"/contact/create", dt)

        return axios.post(api+"/transaction/create",dt,{
            'Content-Type': 'application/json'
        })
    }

    deleteContact() {
        
    }

}