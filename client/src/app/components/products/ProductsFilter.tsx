import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import { CheckBox } from '@mui/icons-material'

import { sortOptions } from '../../constants'
import { ProductFilters } from '../../models/product'

interface Props {
	filterBy: ProductFilters | undefined
}

function ProductsFilter({ filterBy }: Props) {
	return (
		<>
			<Paper sx={{ marginBottom: 2 }}>
				<TextField label='Search products' variant='outlined' fullWidth />
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<FormControl component='fieldset'>
					<FormLabel component='legend'>T</FormLabel>
					<RadioGroup aria-label='' defaultValue='' name=''>
						{sortOptions.map(({ value, label }) => (
							<FormControlLabel
								value={value}
								control={<Radio />}
								label={label}
								key={value}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<FormGroup>
					{filterBy?.productBrands.map(brand => (
						<FormControlLabel control={<CheckBox />} label={brand} key={brand} />
					))}
				</FormGroup>
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<FormGroup>
					{filterBy?.productTypes.map(type => (
						<FormControlLabel control={<CheckBox />} label={type} key={type} />
					))}
				</FormGroup>
			</Paper>
		</>
	)
}

export default ProductsFilter
