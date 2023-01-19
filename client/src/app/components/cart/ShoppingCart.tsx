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

import { useManageCart } from '../../hooks/useManageCart'

import { Cart } from '../../models/cart'

interface Props {
	cartList: Cart | null
}

function ShoppingCart({ cartList }: Props) {
	const { addCustomerItem, removeCustomerItem } = useManageCart()

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
					{cartList?.cartItems.map(cartItem => (
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
									onClick={() => removeCustomerItem(cartItem.productId, 1)}
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
