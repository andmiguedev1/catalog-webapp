import { useState } from 'react'

import { debounce, TextField } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../store/appStore'
import { setProductsParams } from '../../store/reducers/catalogSlice'

function SearchBox() {
	const dispatch = useAppDispatch()
	const { params } = useAppSelector(state => state.catalog)
	const [searchWord, setSearchWord] = useState(params.searchWord)

	const finishedSearch = debounce(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(setProductsParams({ searchWord: event.target.value }))
		},
		3000,
	)

	return (
		<TextField
			label='Search any product...'
			variant='outlined'
			fullWidth
			value={searchWord || ''}
			onChange={(e: any) => {
				setSearchWord(e.target.value)
				finishedSearch(e)
			}}
		/>
	)
}

export default SearchBox
