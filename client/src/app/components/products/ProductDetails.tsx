import { ChangeEvent } from 'react'

import {
	Typography,
	Grid,
	Divider,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useManageCart } from '../../hooks/useManageCart'
import { Product } from '../../models/product'
import { CartItem } from '../../models/cart'

import LoadingIndicator from '../../common/loading/LoadingIndicator'

interface Props {
	productItem: Product | null
	cartItem: CartItem | undefined
}

function ProductDetails({ productItem, cartItem }: Props) {
	const { cartQuantity, setCartQuantity, updateCustomerCart } = useManageCart()

	// Change the number of product cart's quantity
	function handleProductQty(event: ChangeEvent<HTMLInputElement>) {
		const chosenQuantity = parseInt(event.target.value)
		//  Cannot have an invalid quantity
		if (chosenQuantity > 0) {
			setCartQuantity(chosenQuantity)
		}
	}

	function handleUpdateProduct() {
		try {
			updateCustomerCart(cartItem, cartQuantity, productItem)
		} catch (message) {
			console.error(message)
		}
	}

	if (!productItem) return <LoadingIndicator message='Catalog Info...' />

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={6}>
					<img
						src={productItem.image}
						alt={productItem.name}
						style={{ width: '100%' }}
					/>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h3'>{productItem.name}</Typography>
					<Divider sx={{ marginBottom: 2 }} />
					<Typography variant='h4' color='secondary'>
						{productItem.price.toFixed(2)}
					</Typography>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Item Name</TableCell>
									<TableCell>{productItem.name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Item Type</TableCell>
									<TableCell>{productItem.brand}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Item Brand</TableCell>
									<TableCell>{productItem.brand}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Item Stock</TableCell>
									<TableCell>{productItem.quantity}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								type='number'
								label='Number of items'
								fullWidth
								value={cartQuantity}
								onChange={handleProductQty}
							/>
						</Grid>
						<Grid item xs={6}>
							<LoadingButton
								loading={false}
								sx={{ height: '55px' }}
								color='primary'
								size='large'
								variant='contained'
								fullWidth
								onClick={handleUpdateProduct}
							>
								Add to Cart
							</LoadingButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default ProductDetails
