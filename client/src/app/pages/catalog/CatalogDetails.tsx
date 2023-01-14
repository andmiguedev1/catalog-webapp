import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { Product } from '../../models/product'

import ProductDetails from '../../components/products/ProductDetails'
import Layout from '../../layout/Layout'
import agent from '../../api/agent'

function CatalogDetails() {
	const { productId } = useParams<{ productId: string }>()
	const [catalogInfo, setCatalogInfo] = useState<Product | null>(null)

	useEffect(() => {
		agent.CatalogRoutes.singleDisplay(parseInt(productId))
			.then(catalogInfo => setCatalogInfo(catalogInfo))
			.catch(error => console.warn(error))
	}, [productId])

	return (
		<Layout>
			<Container>
				<ProductDetails catalogInfo={catalogInfo} />
			</Container>
		</Layout>
	)
}

export default CatalogDetails
