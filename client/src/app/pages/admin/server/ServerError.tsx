import { Button, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useHistory, useLocation } from 'react-router-dom'
import Layout from '../../../layout/Layout'

function ServerError() {
	const history = useHistory()
	const { state } = useLocation<any>()

	return (
		<Layout>
			<Container component={Paper} sx={{ paddingBlock: 3 }}>
				{state?.error ? (
					<>
						<Typography variant='h5' color='error' gutterBottom>
							{state.error.title}
						</Typography>
						<Divider />
						<Typography color='red'>{state.error.detail}</Typography>
					</>
				) : (
					<Typography variant='h5'>Internal Server Error</Typography>
				)}
				<Button
					variant='contained'
					color='inherit'
					onClick={() => history.push('/products')}
					sx={{ marginBlock: 2 }}
				>
					Go Back to Catalog
				</Button>
			</Container>
		</Layout>
	)
}

export default ServerError
