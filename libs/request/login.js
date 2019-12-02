import Axios from 'axios'

import { api } from '../../config/url'

export default async (phoneNumber) => {
  return Axios.post(
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
}
