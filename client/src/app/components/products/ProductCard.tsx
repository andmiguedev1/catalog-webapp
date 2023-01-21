import { Link } from 'react-router-dom'

import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	Typography,
	Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useManageCart } from '../../hooks/useManageCart'
import { Product } from '../../models/product'

interface Props {
	product: Product
}

function ProductCard({ product }: Props) {
	const { cartStatus, addCustomerItem } = useManageCart()

	return (
		<>
			<Card>
				<CardHeader
					avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
					title={product.name}
				/>
				<CardMedia
					sx={{ height: 240, width: 'auto' }}
					image={product.image}
					title={product.name}
				/>
				<CardContent>
					<Typography gutterBottom color='secondary' variant='h5'>
						${product.price.toFixed(2)}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{product.brand} / {product.type}
					</Typography>
				</CardContent>
				<CardActions>
					<LoadingButton
						loading={cartStatus.includes('pendingAddItem' + product.id)}
						onClick={() => addCustomerItem(product.id)}
						size='small'
						variant='contained'
						fullWidth={true}
					>
						Add to cart
					</LoadingButton>
					<Button size='small' component={Link} to={`/products/${product.id}`}>
						View
					</Button>
				</CardActions>
			</Card>
		</>
	)
}

export default ProductCard
