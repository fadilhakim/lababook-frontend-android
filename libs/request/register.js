import Axios from 'axios'

import { api } from '../../config/url'

export default async (user) => {
  const response = await Axios.post(
    `${api}/register`,
    {
      name: user.userName,
      phoneNumber: user.phoneNumber,
      bookName: user.bookName
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}
