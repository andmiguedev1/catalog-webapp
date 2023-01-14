import { useState, useEffect } from 'react'
import { Container } from '@mui/material'

import agent from '../../api/agent'
import { Product } from '../../models/product'

import Layout from '../../layout/Layout'
import ProductsList from '../../components/products/ProductsList'
import LoadingIndicator from '../../common/loading/LoadingIndicator'

function Catalog() {
	const [loadingIcon, setLoadingIcon] = useState(true)
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		agent.CatalogRoutes.displayAll()
			.then(products => setProducts(products))
			.catch(error => console.log(error))
			.finally(() => setLoadingIcon(false))
	}, [])

	if (loadingIcon) return <LoadingIndicator message='Loading catalog...' />

	return (
		<Layout>
			<Container>
				<ProductsList products={products} />
			</Container>
		</Layout>
	)
}

export default Catalog
