import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'

import agent from '../../api/agent'
import { useAppDispatch, useAppSelector } from '../../store/appStore'

import {
	fetchCategoriesAsync,
	getAxiosParams,
	setPageNumber,
} from '../../store/reducers/catalogSlice'

import { useManageProduct } from '../../hooks/useManageProduct'

import Layout from '../../layout/Layout'
import ProductsFilter from '../../components/products/ProductsFilter'
import ProductsList from '../../components/products/ProductsList'
import PagePagination from '../../common/pagination/PagePagination'

function CatalogList() {
	const [categories, setCategories] = useState()
	const [metadata, setMetadata] = useState()

	const dispatch = useAppDispatch()
	const {
		loadFilters,
		params,
		metadata: catalog,
	} = useAppSelector(state => state.catalog)

	const { loadProducts, storeProducts, fetchCatalogProducts } =
		useManageProduct()

	async function fetchCatalogCategories() {
		if (!loadFilters) {
			await dispatch(fetchCategoriesAsync())
				.then(response => response.payload)
				.then(productFilters => setCategories(productFilters))
		}
	}

	const catalogParams = getAxiosParams(params)
	async function fetchCatalogPagination() {
		await agent.CatalogRoutes.getRecentProducts(catalogParams)
			.then(response => response.pageInfo)
			.then(catalogMetadata => setMetadata(catalogMetadata))
	}

	useEffect(() => {
		if (!loadProducts) {
			fetchCatalogProducts()
		}

		// eslint-disable-next-line
	}, [loadProducts])

	useEffect(() => {
		fetchCatalogCategories()
		fetchCatalogPagination()
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
						{metadata && (
							<PagePagination
								pageInfo={metadata}
								onPageChange={(currentPage: number) => {
									dispatch(setPageNumber({ pageNumber: currentPage }))
								}}
							/>
						)}
					</Grid>
				</Grid>
			</Container>
		</Layout>
	)
}

export default CatalogList
