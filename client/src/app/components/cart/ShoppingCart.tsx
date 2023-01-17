import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { Add, Delete, Remove } from '@mui/icons-material'

import agent from '../../api/agent'
import { useCartContext } from '../../state/context/cartContext'

import { Cart } from '../../models/cart'

interface Props {
	shoppingList: Cart | null
}

function ShoppingCart({ shoppingList }: Props) {
	const { setShoppingCart, removeCartItem } = useCartContext()

	function removeCustomerItem(productId: number, quantity = 1) {
		agent.CartRoutes.removeFromShoppingCart(productId, quantity)
			.then(() => removeCartItem(productId, quantity))
			.catch(error => console.warn(error))
	}

	function addCustomerItem(productId: number) {
		agent.CartRoutes.addToShoppingCart(productId)
			.then(currentCart => setShoppingCart(currentCart))
			.catch(error => console.warn(error))
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Product</TableCell>
						<TableCell align='right'>Price</TableCell>
						<TableCell align='center'>Quantity</TableCell>
						<TableCell align='right'>Subtotal</TableCell>
						<TableCell align='right'></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{shoppingList?.cartItems.map(cartItem => (
						<TableRow
							key={cartItem.productId}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								<Box display='flex' alignItems='center'>
									<img
										src={cartItem.image}
										alt={cartItem.name}
										style={{ height: 50, marginRight: 20 }}
									/>
									<span>{cartItem.name}</span>
								</Box>
							</TableCell>
							<TableCell align='right'>${cartItem.price.toFixed(2)}</TableCell>
							<TableCell align='center'>
								<IconButton
									color='info'
									onClick={() => removeCustomerItem(cartItem.productId)}
								>
									<Remove />
								</IconButton>
								{cartItem.quantity}
								<IconButton
									color='info'
									onClick={() => addCustomerItem(cartItem.productId)}
								>
									<Add />
								</IconButton>
							</TableCell>
							<TableCell align='right'>
								${(cartItem.price * cartItem.quantity).toFixed(2)}
							</TableCell>
							<TableCell align='right'>
								<IconButton
									color='error'
									onClick={() =>
										removeCustomerItem(cartItem.productId, cartItem.quantity)
									}
								>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		
	)
}

export default ShoppingCart
