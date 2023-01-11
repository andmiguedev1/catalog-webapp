import { useState, useEffect } from 'react'
import { Container } from '@mui/material'

import { Product } from '../../models/product'

import Layout from '../../layout/Layout'
import ProductsList from '../../components/products/ProductsList'
import agent from '../../api/agent'

function Catalog() {
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		agent.Catalog.list().then(products => setProducts(products))
	}, [])

	return (
		<Layout>
			<Container>
				<ProductsList products={products} />
			</Container>
		</Layout>
	)
}

export default Catalog
