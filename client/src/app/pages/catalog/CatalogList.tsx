import { useState, useEffect } from 'react'
import { Container } from '@mui/material'

import agent from '../../api/agent'
import { useCatalogContext } from '../../state/context/catalogContext'

import { Product } from '../../models/product'

import Layout from '../../layout/Layout'
import ProductsList from '../../components/products/ProductsList'
import LoadingIndicator from '../../common/loading/LoadingIndicator'

function Catalog() {
	const { loadCatalog, setLoadCatalog } = useCatalogContext()
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		agent.CatalogRoutes.displayAll()
			.then(products => setProducts(products))
			.catch(error => console.log(error))
			.finally(() => setLoadCatalog(!loadCatalog))
		// eslint-disable-next-line
	}, [])

	return (
		<Layout>
			<Container>
				{loadCatalog ? (
					<LoadingIndicator message='Loading catalog...' />
				) : (
					<ProductsList products={products} />
				)}
			</Container>
		</Layout>
	)
}

export default Catalog
