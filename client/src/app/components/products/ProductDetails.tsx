import {
	Typography,
	Grid,
	Divider,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from '@mui/material'

import { Product } from '../../models/product'

import LoadingIndicator from '../../common/loading/LoadingIndicator'

interface Props {
	product: Product | undefined
}

function ProductDetails({ product }: Props) {
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
					</Grid>
				</Grid>
			)}
		</>
	)
}

export default ProductDetails
