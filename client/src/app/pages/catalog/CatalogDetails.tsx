import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import agent from '../../api/agent'

import { Product } from '../../models/product'

import Layout from '../../layout/Layout'
import ProductDetails from '../../components/products/ProductDetails'

function CatalogDetails() {
	const { productId } = useParams()
	const [catalogInfo, setCatalogInfo] = useState<Product | null>(null)

	useEffect(() => {
		agent.CatalogRoutes.getSingleProduct(parseInt(productId!))
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
