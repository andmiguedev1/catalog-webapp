import { Grid } from '@mui/material'

import { useManageProduct } from '../../hooks/useManageProduct'
import { StoreProducts } from '../../models/product'

import CardSkeleton from '../../common/cards/CardSkeleton'
import ProductCard from './ProductCard'

function ProductsList({ products }: StoreProducts) {
	const { loadProducts } = useManageProduct()

	return (
		<Grid container spacing={2}>
			{products.map(product => (
				<Grid item xs={12} sm={6} md={4} key={product.id}>
					{!loadProducts ? <CardSkeleton /> : <ProductCard product={product} />}
				</Grid>
			))}
		</Grid>
	)
}

export default ProductsList
