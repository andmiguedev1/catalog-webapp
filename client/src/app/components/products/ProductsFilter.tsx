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

import { useAppSelector } from '../../store/appStore'
import { sortOptions } from '../../constants'

function ProductsFilter() {
	const { brands: productBrands, types: productTypes } = useAppSelector(
		state => state.products,
	)

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
					{productBrands.map(brand => (
						<FormControlLabel control={<CheckBox />} label={brand} key={brand} />
					))}
				</FormGroup>
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<FormGroup>
					{productTypes.map(type => (
						<FormControlLabel control={<CheckBox />} label={type} key={type} />
					))}
				</FormGroup>
			</Paper>
		</>
	)
}

export default ProductsFilter
