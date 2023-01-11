import { Button, ButtonGroup, Container, Typography } from '@mui/material'

import Layout from '../../layout/Layout'
import agent from '../../api/agent'

function TestButtons() {
	return (
		<Layout>
			<Container>
				<Typography gutterBottom variant='h5'>
					Test Common Server Errors
				</Typography>
				<ButtonGroup fullWidth>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.badRequest()}
					></Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.unauthorized()}
					></Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.notFound()}
					></Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.serverError()}
					></Button>
				</ButtonGroup>
			</Container>
		</Layout>
	)
}

export default TestButtons
