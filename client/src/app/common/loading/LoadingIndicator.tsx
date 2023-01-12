import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface Props {
	message?: string
}

function LoadingIndicator({ message = 'Loading...' }: Props) {
	return (
		<Backdrop open={true} invisible={true}>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'
			>
				<CircularProgress size={100} color='primary' thickness={2.0} />
				<Typography
					variant='h6'
					sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}
				>
					{message}
				</Typography>
			</Box>
		</Backdrop>
	)
}

export default LoadingIndicator
