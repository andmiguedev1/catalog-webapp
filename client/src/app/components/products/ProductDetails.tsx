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
import { LoadingButton } from '@mui/lab'

import { Product } from '../../models/product'

interface Props {
	catalogInfo: Product | null
}

function ProductDetails({ catalogInfo }: Props) {
	return (
		<>
			{!catalogInfo ? (
				<LoadingButton loading={true} />
			) : (
				<Grid container spacing={6}>
					<Grid item xs={6}>
						<img
							src={catalogInfo.image}
							alt={catalogInfo.name}
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h3'>{catalogInfo.name}</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						<Typography variant='h4' color='secondary'>
							{catalogInfo.price.toFixed(2)}
						</Typography>
						<TableContainer>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>Item Name</TableCell>
										<TableCell>{catalogInfo.name}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Type</TableCell>
										<TableCell>{catalogInfo.brand}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Brand</TableCell>
										<TableCell>{catalogInfo.brand}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Item Stock</TableCell>
										<TableCell>{catalogInfo.quantity}</TableCell>
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
