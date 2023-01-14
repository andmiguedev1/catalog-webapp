import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { Cart } from '../../models/cart'

interface Props {
	shoppingList: Cart | null
}

function ShoppingCart({ shoppingList }: Props) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align='right'>Price</TableCell>
						<TableCell align='right'>Quantity</TableCell>
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
								{cartItem.name}
							</TableCell>
							<TableCell align='right'>${cartItem.price.toFixed(2)}</TableCell>
							<TableCell align='right'>{cartItem.quantity}</TableCell>
							<TableCell align='right'>
								${(cartItem.price * cartItem.quantity).toFixed(2)}
							</TableCell>
							<TableCell align='right'>
								<IconButton color='error'>
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
