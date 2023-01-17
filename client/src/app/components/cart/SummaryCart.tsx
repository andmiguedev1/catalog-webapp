import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material'

function SummaryCart() {
	const subtotal = 0
	const deliveryFee = 0

	return (
		<TableContainer component={Paper} variant={'outlined'}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>Subtotal</TableCell>
						<TableCell align='right'>{subtotal}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Shipping Fee</TableCell>
						<TableCell align='right'>{deliveryFee}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Total</TableCell>
						<TableCell align='right'>{subtotal + deliveryFee}</TableCell>
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
