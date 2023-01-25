import { requestType } from '../requests/requests'

export const CartRoutes = {
   getShoppingCart: () => requestType.get('cart'),
   addToShoppingCart: (productId: number, quantity: number = 1) => requestType.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
   removeFromShoppingCart: (productId: number, quantity: number) => requestType.delete(`cart?productId=${productId}&quantity=${quantity}`)
}

export const CatalogRoutes = {
   getRecentProducts: () => requestType.get('products'),
   getSingleProduct: (productId: number) => requestType.get(`products/${productId}`),
   getProductCategories: () => requestType.get('products/filterBy')
}

export const ErrorRoutes = {
   invalidRequest: () => requestType.get('Error/validation-error'),
   badRequest: () => requestType.get('Error/bad-request').catch(error => console.warn(error)),
   unauthorized: () => requestType.get('Error/unauthorized').catch(error => console.warn(error)),
   notFound: () => requestType.get('Error/not-found').catch(error => console.warn(error)),
   serverError: () => requestType.get('Error/server-error').catch(error => console.error(error))
}