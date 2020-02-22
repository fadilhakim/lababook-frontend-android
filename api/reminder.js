import axios from "axios"

import { URLReminderList, URLReminderUpdateStatusAlarm } from '../config/url'

export const GetReminderList = params => {
    return axios.get(URLReminderList, {
        params: {
            bookId: params.bookId
        },
        headers: {
            'Content-Type': 'application/json',
            'token': 'iniTokenLogin'
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
            'token': 'iniTokenLogin'
        }
    })
}
