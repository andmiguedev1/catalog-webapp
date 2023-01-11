import { useState } from 'react'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'

import Layout from '../../layout/Layout'
import agent from '../../api/agent'
import TrackErrors from '../errors/TrackErrors'

function TestButtons() {
	const [invalidErrors, setInvalidErrors] = useState<string[]>([])

	async function displayErrors() {
		agent.CommonErrors.invalidRequest()
	}

	return (
		<Layout>
			<Container>
				<Typography gutterBottom variant='h5'>
					Test Common Server Errors
				</Typography>
				<ButtonGroup fullWidth>
					<Button variant='contained' onClick={displayErrors}>
						Invalid Request
					</Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.badRequest()}
					>
						Bad Request
					</Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.unauthorized()}
					>
						Unauthorized
					</Button>
					<Button variant='contained' onClick={() => agent.CommonErrors.notFound()}>
						Not Found
					</Button>
					<Button
						variant='contained'
						onClick={() => agent.CommonErrors.serverError()}
					>
						Server Error
					</Button>
				</ButtonGroup>
				{invalidErrors && <TrackErrors invalidErrors={invalidErrors} />}
			</Container>
		</Layout>
	)
}

export default TestButtons
