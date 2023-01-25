import { useEffect } from 'react'
import { Container, Grid, Box, Typography, Pagination } from '@mui/material'

import { useManageProduct } from '../../hooks/useManageProduct'

import Layout from '../../layout/Layout'
import LoadingIndicator from '../../common/loading/LoadingIndicator'
import ProductsFilter from '../../components/products/ProductsFilter'
import ProductsList from '../../components/products/ProductsList'

function CatalogList() {
	const {
		loadProducts,
		storeProducts,
		fetchCatalogProducts,
		loadFilters,
		fetchProductCategories,
	} = useManageProduct()

	useEffect(() => {
		if (!loadProducts) {
			fetchCatalogProducts()
		}
		// eslint-disable-next-line
	}, [loadProducts])

	useEffect(() => {
		if (!loadFilters) {
			fetchProductCategories()
		}
		// eslint-disable-next-line
	}, [loadFilters])

	if (!loadProducts) return <LoadingIndicator message='Loading Catalog...' />

	return (
		<Layout>
			<Container>
				<Grid container columnSpacing={4}>
					<Grid item xs={3}>
						<ProductsFilter />
					</Grid>
					<Grid item xs={9}>
						<ProductsList products={storeProducts} />
					</Grid>
					<Grid item xs={3} />
					<Grid item xs={9}>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Typography>Displaying 1-6 (20 items)</Typography>
							<Pagination color='secondary' size='large' count={10} page={2} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	)
}

export default CatalogList
