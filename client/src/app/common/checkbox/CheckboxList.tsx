import {
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from '@mui/material'
import React from 'react'

interface Props {
   optionsList: Array<{ value: string, label: string }>
   selectValue: string
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function CheckboxList({ optionsList, selectValue, onChange} : Props) {
	return (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>Categories</FormLabel>
         <RadioGroup
            onChange={onChange} value={selectValue}>
				{optionsList.map(({ value, label }) => (
					<FormControlLabel
						value={value}
						control={<Radio />}
						label={label}
						key={value}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}

export default CheckboxList
