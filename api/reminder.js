import axios from "axios"

import { URLReminderPDF, URLReminderList, URLReminderUpdateStatusAlarm } from '../config/url'

export const GetReminderList = params => {
    // console.log(params)
    return axios.get(URLReminderList, {
        params: {
            bookId: params.bookId
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + params.token
        }
    })
}

export const UpdateReminderStatusAlarm = params => {
    let bodyFormData = new FormData() // for Content-Type: multipart/form-data
    // let bodyFormData = new URLSearchParams() // for application/x-www-form-urlencoded

    bodyFormData.append('trxId', params.trxId)
    bodyFormData.append('statusAlarm', params.statusAlarm)

    return axios.post(URLReminderUpdateStatusAlarm, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization : 'Bearer ' + params.token
        }
    })
}

export const GetPDFFile = params => {
    console.log(params)
    return axios.get(URLReminderPDF, {
        params: {
            bookId: params.bookId
        },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + params.token,
            // 'Response-Type': 'blob'
        }
    })
}
