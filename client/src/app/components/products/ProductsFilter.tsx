import { FormControlLabel, FormGroup, Paper } from '@mui/material'
import { CheckBox } from '@mui/icons-material'

import { sortOptions } from '../../constants'
import { ProductFilters } from '../../models/product'

import SearchBox from '../../common/search/SearchBox'
import CheckboxList from '../../common/checkbox/CheckboxList'
import { useManageProduct } from '../../hooks/useManageProduct'

interface Props {
	filterBy: ProductFilters | undefined
}

function ProductsFilter({ filterBy }: Props) {
	const { productsMetadata, filterCatalogProducts } = useManageProduct()

	return (
		<>
			<Paper sx={{ marginBottom: 2 }}>
				<SearchBox />
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<CheckboxList
					selectValue={productsMetadata.orderBy}
					optionsList={sortOptions}
					onChange={e => filterCatalogProducts(e)}
				/>
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
