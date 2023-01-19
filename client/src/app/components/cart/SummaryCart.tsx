import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material'

import { useManageCart } from '../../hooks/useManageCart'

import { getSubtotalCost, setCurrencyFormat } from '../../utils'

function SummaryCart() {
	const { shoppingCart } = useManageCart()

	//  Calculate subtotal amount of customer's cart
	const subtotal = getSubtotalCost(shoppingCart)
	// Display shipping fee if subtotal is less than 50
	const shippingFee = subtotal > 50 ? 0 : 7

	return (
		<TableContainer component={Paper} variant={'outlined'}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>Subtotal</TableCell>
						<TableCell align='right'>{setCurrencyFormat(subtotal)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Shipping Fee</TableCell>
						<TableCell align='right'>{setCurrencyFormat(shippingFee)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Total</TableCell>
						<TableCell align='right'>
							{setCurrencyFormat(subtotal + shippingFee)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<span style={{ fontStyle: 'italic' }}>
								Free Shipping on orders over $50
							</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default SummaryCart
