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
		fetchCatalogProducts()
		// eslint-disable-next-line
	}, [])

	return (
		<Layout>
			<Container>
				{loadProducts ? (
					<LoadingIndicator message='Loading Catalog...' />
				) : (
					<ProductsList products={storeProducts} />
				)}
			</Container>
		</Layout>
	)
}

export default CatalogList
