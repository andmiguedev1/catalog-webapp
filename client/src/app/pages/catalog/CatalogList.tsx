import { useEffect } from 'react'
import { Container } from '@mui/material'

import { useManageProduct } from '../../hooks/useManageProduct'

import Layout from '../../layout/Layout'
import LoadingIndicator from '../../common/loading/LoadingIndicator'
import ProductsList from '../../components/products/ProductsList'

function CatalogList() {
	const { loadProducts, storeProducts, fetchCatalogProducts } =
		useManageProduct()

	useEffect(() => {
		if (!loadProducts) {
			fetchCatalogProducts()
		}
		// eslint-disable-next-line
	}, [])

	if (loadProducts) return <LoadingIndicator message='Loading Catalog...' />

	return (
		<Layout>
			<Container>
				<ProductsList products={storeProducts} />
			</Container>
		</Layout>
	)
}

export default CatalogList
