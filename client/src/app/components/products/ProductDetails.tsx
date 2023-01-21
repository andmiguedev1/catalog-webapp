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

import LoadingIndicator from '../../common/loading/LoadingIndicator'

interface Props {
	product: Product | null
	// productItem: CartItem | null
}

function ProductDetails({ product }: Props) {
	const { cartQuantity, setCartQuantity, updateCustomerCart, cartStatus } =
		useManageCart()

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
			updateCustomerCart(cartQuantity, product)
		} catch (message) {
			console.error(message)
		}
	}

	return (
		<>
			{!product ? (
				<LoadingIndicator message='Catalog Info...' />
			) : (
				<Grid container spacing={6}>
					<Grid item xs={6}>
						<img src={product.image} alt={product.name} style={{ width: '100%' }} />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h3'>{product.name}</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						<Typography variant='h4' color='secondary'>
							{product.price.toFixed(2)}
						</Typography>
						<TableContainer>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>Item Name</TableCell>
										<TableCell>{product.name}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Type</TableCell>
										<TableCell>{product.brand}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Brand</TableCell>
										<TableCell>{product.brand}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Stock</TableCell>
										<TableCell>{product.quantity}</TableCell>
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
									loading={cartStatus.includes('pending')}
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
			)}
		</>
	)
}

export default ProductDetails
