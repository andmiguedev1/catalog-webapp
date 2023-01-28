import { useState } from 'react'
import { debounce, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/appStore'
import { setProductsMetadata } from '../../store/reducers/catalogSlice'

function SearchBox() {
	const dispatch = useAppDispatch()
	const { metadata } = useAppSelector(state => state.catalog)
	const [searchWord, setSearchWord] = useState(metadata.searchWord)

	const finishedSearch = debounce(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(setProductsMetadata({ searchWord: event.target.value }))
		},
		3000,
	)

	return (
		<TextField
			label='Search products...'
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
