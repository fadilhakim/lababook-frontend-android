import { API_URL } from "react-native-dotenv"

// export const api = 'http://192.168.43.11:3000'
export const api = "https://api.lababook.com"//'http://10.120.1.247:3000'
// export const api = 'https://lababook-api-dev.herokuapp.com'

export const URLLogin = api + '/login'
export const URLGetOTP = api + '/getOtp'
export const URLRegister = api + '/register'
export const URLCheckToken = api + '/checkToken'
export const URLReminderList = api + '/transaction/reminder'
export const URLReminderUpdateStatusAlarm = api + '/transaction/update-status-alarm'
