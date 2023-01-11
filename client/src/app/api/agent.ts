import axios, { AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:5000/api/'

const APIResponse = (response: AxiosResponse) => response.data

axios.interceptors.response.use(serverResponse => {
   return serverResponse
}, (error: AxiosError) => {
   
   // Display error message to user
   const { data, status } = error.response!

   switch (status) {
      case 400:
         toast.info(data.title)
         break
      case 401:
         toast.warn(data.title)
         break
      case 500:
         toast.error(data.title)
         break
      default:
         break      
   }

   // Caught error execptions in the console
   return Promise.reject(error.response)
})

const requestType = {
   get: (url: string) => axios.get(url).then(APIResponse),
   post: (url: string, body: {}) => axios.post(url, body).then(APIResponse),
   put: (url: string, body: {}) => axios.put(url, body).then(APIResponse),
   delete: (url: string) => axios.delete(url).then(APIResponse)
}

const Endpoints = {
   displayAll: () => requestType.get('products'),
   singleDisplay: (productId: number) => requestType.get(`products/${productId}`)
}

const CommonErrors = {
   badRequest: () => requestType.get('Error/bad-request').catch(error => console.warn(error)),
   unauthorized: () => requestType.get('Error/unauthorized').catch(error => console.warn(error)),
   notFound: () => requestType.get('Error/not-found').catch(error => console.warn(error)),
   serverError: () => requestType.get('Error/server-error').catch(error => console.error(error))
}

const agent = {
   Endpoints,
   CommonErrors
}

export default agent;