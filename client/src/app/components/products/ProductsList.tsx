import { Grid } from '@mui/material'

import { StoreProducts } from '../../models/product'

import ProductCard from './ProductCard'

function ProductsList({ products }: StoreProducts) {
	return (
		<Grid container spacing={2}>
			{products.map(product => (
				<Grid item xs={12} sm={6} md={4} key={product.id}>
					<ProductCard product={product} />
				</Grid>
			))}
		</Grid>
	)
}

export default ProductsList
