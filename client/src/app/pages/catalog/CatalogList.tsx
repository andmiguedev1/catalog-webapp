import { useState, useEffect } from 'react'
import { Container, Grid, Box, Typography, Pagination } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../store/appStore'
import { fetchCategoriesAsync } from '../../store/reducers/catalogSlice'
import { useManageProduct } from '../../hooks/useManageProduct'

import Layout from '../../layout/Layout'
import ProductsFilter from '../../components/products/ProductsFilter'
import ProductsList from '../../components/products/ProductsList'

function CatalogList() {
	const [categories, setCategories] = useState()

	const dispatch = useAppDispatch()
	const { loadFilters } = useAppSelector(state => state.catalog)

	const { loadProducts, storeProducts, fetchCatalogProducts } =
		useManageProduct()

	async function fetchCatalogCategories() {
		if (!loadFilters) {
			await dispatch(fetchCategoriesAsync())
				.then(response => response.payload)
				.then(productFilters => setCategories(productFilters))
		}
	}

	useEffect(() => {
		if (!loadProducts) {
			fetchCatalogProducts()
		}

		// eslint-disable-next-line
	}, [loadProducts])

	useEffect(() => {
		fetchCatalogCategories()
		// eslint-disable-next-line
	}, [])

	// if (loadingStatus.includes('pending'))
	//	return <LoadingIndicator message='Loading Catalog...' />

	return (
		<Layout>
			<Container>
				<Grid container columnSpacing={4}>
					<Grid item xs={3}>
						<ProductsFilter filterBy={categories} />
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
