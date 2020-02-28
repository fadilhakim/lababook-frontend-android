import axios from "axios"

import { URLGetOTP, URLLogin, URLRegister, URLCheckToken } from '../config/url'

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

export const Register = params => {
    let bodyFormData = new FormData()

    bodyFormData.append('phoneNumber', params.phoneNumber)
    bodyFormData.append('name', params.name)
    bodyFormData.append('bookName', params.bookName)
    bodyFormData.append('bookType', params.bookType)

    return axios.post(URLRegister, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const GetOTP = params => {
    let bodyFormData = new FormData()

    bodyFormData.append('phoneNumber', params.phoneNumber)

    return axios.post(URLGetOTP, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const LoginUser = params => {
    let bodyFormData = new FormData()

    bodyFormData.append('phoneNumber', params.phoneNumber)
    bodyFormData.append('otp', params.otp)

    return axios.post(URLLogin, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
