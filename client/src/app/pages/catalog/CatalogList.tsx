import { useEffect } from 'react'
import { Container, Grid } from '@mui/material'

import { useAppSelector } from '../../store/appStore'
import { useManageProduct } from '../../hooks/useManageProduct'
import { useManageCatalog } from '../../hooks/useManageCatalog'

import Layout from '../../layout/Layout'
import ProductsFilter from '../../components/products/ProductsFilter'
import ProductsList from '../../components/products/ProductsList'
import PagePagination from '../../common/pagination/PagePagination'

function CatalogList() {
	const { loadFilters } = useAppSelector(state => state.catalog)

	const { loadProducts, storeProducts, fetchCatalogProducts } =
		useManageProduct()

	const {
		categories,
		pagination,
		fetchCatalogCategories,
		fetchCatalogPagination,
		changeCatalogPage,
	} = useManageCatalog()

	useEffect(() => {
		if (!loadProducts) {
			fetchCatalogProducts()
			fetchCatalogPagination()
		}
		if (!loadFilters) {
			fetchCatalogCategories()
		}

		// eslint-disable-next-line
	}, [loadProducts])

	// if (loadingStatus.includes('pending'))
	//	return <LoadingIndicator message='Loading Catalog...' />

	console.log(pagination)

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
						{pagination && (
							<PagePagination
								pageInfo={pagination}
								onPageChange={(page: number) => changeCatalogPage(page)}
							/>
						)}
					</Grid>
				</Grid>
			</Container>
		</Layout>
	)
}

export default CatalogList
