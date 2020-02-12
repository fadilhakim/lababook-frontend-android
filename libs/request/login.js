import Axios from 'axios'

import { api } from '../../config/url'

export default async (phoneNumber) => {
  const response = await Axios.post(
    `${api}/login`,
    {
      phoneNumber
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}
