import axios from "axios"

import { api } from '../config/url'

export default class TransactionAPI {

    getTransaction() {

        return axios.get(api+"/transactions",{

            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getTransactionByBook( param ) {

        const bookId = param.bookId
        const sort = param.sort
        const startDate = param.startDate
        const endDate = param.endDate

        return axios.get(api+"/transaction/book",{
            params:{
                bookId:bookId,
                sort:sort,
                startDate:startDate,
                endDate:endDate
            },
            headers:{
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + param.token
            }
        })
    }

    getTransactionByContact(contactId) {
        return axios.get(api+"/transaction/contact",{
            params:{
                contactId:contactId
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + param.token
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
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + param.token
        })
    }

    deleteTransaction() {

    }

}
