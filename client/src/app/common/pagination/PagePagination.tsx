import { Box, Pagination, Typography } from '@mui/material'

import { getCurrentPage, getTotalPages } from '../../utils'
import { Metadata } from '../../models/pagination'

interface Props {
	pageInfo: Metadata
	onPageChange: (page: number) => void
}

function PagePagination({ pageInfo, onPageChange }: Props) {
	const { currentPage, pageSize, totalPages, totalCount } = pageInfo
	console.log(currentPage)

	return (
		<Box display='flex' justifyContent='center' alignItems='center'>
			<Typography>
				Displaying &nbsp;
				{getCurrentPage(currentPage, pageSize)}&nbsp;-&nbsp;
				{getTotalPages(currentPage, pageSize, totalCount)}
				&nbsp; of ({totalCount} items)
			</Typography>
			<Pagination
				color='secondary'
				size='large'
				count={totalPages}
				page={currentPage}
				onChange={(e, page) => onPageChange(page)}
			/>
		</Box>
	)
}

export default PagePagination
