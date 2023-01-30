import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react'

interface Props {
	items: string[] | undefined
	checked: string[] | undefined
	onChange: (items: string[]) => void
}

function CheckboxList({ items, checked, onChange }: Props) {
	const [checkedItems, setCheckedItems] = useState(checked || [])

	function checkMultipleBoxes(checkedItem: string) {
		let newCheckedItems: string[] = []
		// Find current checked items
		const currentItems = checkedItems.findIndex(item => item === checkedItem)
		if (currentItems === -1) {
			// If item is not already checked, then add it
			// to the array of checked items
			newCheckedItems = [...checkedItems, checkedItem]
		} else {
			// Populate array of checked items
			newCheckedItems = checkedItems.filter(item => item !== checkedItem)
		}

		// Create a new array with checked items
		// and pass it to the redux store
		setCheckedItems(newCheckedItems)
		onChange(newCheckedItems)
	}

	return (
		<FormGroup>
			{items?.map(item => (
				<FormControlLabel
					control={
						<Checkbox
							checked={checkedItems.indexOf(item) !== -1}
							onClick={() => checkMultipleBoxes(item)}
						/>
					}
					label={item}
					key={item}
				/>
			))}
		</FormGroup>
	)
}

export default CheckboxList
