import Axios from 'axios'

import { api } from '../../config/url'

export default async (phoneNumber, otp) => {
  console.log(phoneNumber, otp)
  const response = await Axios.post(
    `${api}/check-otp`,
    {
      phoneNumber,
      otp
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}
