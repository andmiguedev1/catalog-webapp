import { useState, useEffect } from 'react'
import { Container } from '@mui/material'

import agent from '../../api/agent'
import { useCatalogContext } from '../../state/context/catalogContext'

import { Product } from '../../models/product'

import Layout from '../../layout/Layout'
import ProductsList from '../../components/products/ProductsList'

function Catalog() {
	const { loadCatalog, setLoadCatalog } = useCatalogContext()
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		agent.CatalogRoutes.displayAll()
			.then(storeProducts => setProducts(storeProducts))
			.catch(error => console.log(error))
			.finally(() => setLoadCatalog(!loadCatalog))
	}, [setProducts])

	return (
		<Layout>
			<Container>
				<ProductsList products={products} />
			</Container>
		</Layout>
	)
}

export default Catalog
