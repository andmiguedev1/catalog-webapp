import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';

const clientResponse = (response: AxiosResponse) => response.data;

const requestType = {
   get: (url: string) => axios.get(url).then(clientResponse),
   post: (url: string, body: {}) => axios.post(url, body).then(clientResponse),
   put: (url: string, body: {}) => axios.put(url, body).then(clientResponse),
   delete: (url: string) => axios.delete(url).then(clientResponse)
}

const Catalog = {
   list: () => requestType.get('products'),
   details: (productId: number) => requestType.get(`products/${productId}`)
}

const SampleRequests = {
   badRequest: () => requestType.get('Error/bad-request'),
   unauthorized: () => requestType.get('Error/unauthorized'),
   notFound: () => requestType.get('Error/not-found'),
   serverError: () => requestType.get('Error/server-error')
}

const agent = {
   Catalog,
   SampleRequests
}

export default agent;