import axios from 'axios'

import { APIResponse } from '../helpers'

export const requestType = {
   get: (url: string) => axios.get(url).then(APIResponse),
   post: (url: string, body: {}) => axios.post(url, body).then(APIResponse),
   put: (url: string, body: {}) => axios.put(url, body).then(APIResponse),
   delete: (url: string) => axios.delete(url).then(APIResponse)
}