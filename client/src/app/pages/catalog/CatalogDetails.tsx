import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '@mui/material'

import agent from '../../api/agent'
import { Product } from '../../models/product'
import { useCatalogContext } from '../../state/context/catalogContext'

import Layout from '../../layout/Layout'
import ProductDetails from '../../components/products/ProductDetails'
import LoadingIndicator from '../../common/loading/LoadingIndicator'

function CatalogDetails() {
	const { productId } = useParams()
	const { loadCatalog } = useCatalogContext()
	const [catalogInfo, setCatalogInfo] = useState<Product | null>(null)

	useEffect(() => {
		agent.CatalogRoutes.singleDisplay(parseInt(productId!))
			.then(catalogInfo => setCatalogInfo(catalogInfo))
			.catch(error => console.warn(error))
	}, [productId])

	return (
		<Layout>
			<Container>
				{loadCatalog ? (
					<LoadingIndicator message='Loading catalog info...' />
				) : (
					<ProductDetails catalogInfo={catalogInfo} />
				)}
			</Container>
		</Layout>
	)
}

export default CatalogDetails
