import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { useManageProduct } from '../../hooks/useManageProduct'

import Layout from '../../layout/Layout'
import ProductDetails from '../../components/products/ProductDetails'

function CatalogDetails() {
	const { productId } = useParams()
	const { storeProduct, fetchCatalogProduct } = useManageProduct()

	useEffect(() => {
		fetchCatalogProduct(productId!)
		// eslint-disable-next-line
	}, [productId])

	return (
		<Layout>
			<Container>
				<ProductDetails product={storeProduct} />
			</Container>
		</Layout>
	)
}

export default CatalogDetails
