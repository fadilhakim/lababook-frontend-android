import axios from "axios"

import { URLLogin, URLCheckToken } from '../config/url'

export const CheckTokenIsValid = params => {
    let bodyFormData = new FormData() // for Content-Type: multipart/form-data
    // let bodyFormData = new URLSearchParams() // for application/x-www-form-urlencoded

    bodyFormData.append('tokenId', params.token)

    return axios.post(URLCheckToken, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const DoLogin = params => {
    let bodyFormData = new FormData()

    bodyFormData.append('phoneNumber', params.phoneNumber)

    return axios.post(URLLogin, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const CheckOTP = params => {
    let bodyFormData = new FormData()

    bodyFormData.append('phoneNumber', params.phoneNumber)
    bodyFormData.append('otp', params.otp)

    return axios.post(URLLogin, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
