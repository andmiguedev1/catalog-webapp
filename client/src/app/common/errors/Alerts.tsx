import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import agent from '../../api/agent'

function Alerts() {
	return (
		<Container>
			<Typography gutterBottom variant='h2'>
				Test Common Server Errors
			</Typography>
			<ButtonGroup fullWidth>
				<Button
					variant='contained'
					onClick={() => agent.SampleRequests.badRequest()}
				></Button>
				<Button
					variant='contained'
					onClick={() => agent.SampleRequests.unauthorized()}
				></Button>
				<Button
					variant='contained'
					onClick={() => agent.SampleRequests.notFound()}
				></Button>
				<Button
					variant='contained'
					onClick={() => agent.SampleRequests.serverError()}
				></Button>
			</ButtonGroup>
		</Container>
	)
}

export default Alerts
