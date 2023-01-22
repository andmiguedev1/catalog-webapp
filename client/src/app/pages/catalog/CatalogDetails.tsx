import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { useManageProduct } from '../../hooks/useManageProduct'
import { useManageCart } from '../../hooks/useManageCart'

import Layout from '../../layout/Layout'
import ProductDetails from '../../components/products/ProductDetails'

function CatalogDetails() {
	const { productId } = useParams<{ productId: string }>()

	const { storeProduct, fetchCatalogProduct } = useManageProduct()
	const { shoppingCart, setCartQuantity, findProductInCart } = useManageCart()

	const cartProduct = findProductInCart(shoppingCart)

	useEffect(() => {
		if (!storeProduct) {
			fetchCatalogProduct(productId!)
		} else if (cartProduct !== undefined) {
			setCartQuantity(cartProduct.quantity)
		}

		// eslint-disable-next-line
	}, [productId])

	return (
		<Layout>
			<Container>
				<ProductDetails productItem={storeProduct} cartItem={cartProduct} />
			</Container>
		</Layout>
	)
}

export default CatalogDetails
