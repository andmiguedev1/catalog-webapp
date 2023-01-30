import { Paper } from '@mui/material'

import { sortOptions } from '../../constants'
import { ProductFilters } from '../../models/product'

import { useAppSelector } from '../../store/appStore'
import { useManageProduct } from '../../hooks/useManageProduct'

import SearchBox from '../../common/search/SearchBox'
import SelectionList from '../../common/selection/SelectionList'
import CheckboxList from '../../common/checkbox/CheckboxList'

interface Props {
	filterBy: ProductFilters | undefined
}

function ProductsFilter({ filterBy }: Props) {
	const { metadata } = useAppSelector(state => state.catalog)
	const { filterCatalogProducts, chooseCatalogCategories } = useManageProduct()

	const productBrands = metadata.productBrands
	const productTypes = metadata.productTypes

	return (
		<>
			<Paper sx={{ marginBottom: 2 }}>
				<SearchBox />
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<SelectionList
					selectValue={metadata.orderBy}
					optionsList={sortOptions}
					onChange={e => filterCatalogProducts(e)}
				/>
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<CheckboxList
					items={filterBy?.productBrands}
					checked={productBrands}
					onChange={productBrands =>
						chooseCatalogCategories('brands', productBrands)
					}
				/>
			</Paper>
			<Paper sx={{ marginBottom: 2, padding: 2 }}>
				<CheckboxList
					items={filterBy?.productTypes}
					checked={productTypes}
					onChange={productTypes => chooseCatalogCategories('types', productTypes)}
				/>
			</Paper>
		</>
	)
}

export default ProductsFilter
