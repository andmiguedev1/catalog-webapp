import { useState } from 'react'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'

import agent from '../../api/agent'
import Layout from '../../layout/Layout'
import AlertErrors from '../errors/AlertErrors'

function TestButtons() {
	const [invalidErrors, setInvalidErrors] = useState<string[]>([])

	async function displayErrors() {
		agent.ErrorRoutes.invalidRequest()
			.then(error => console.log(error))
			.catch(invalidErrors => setInvalidErrors(invalidErrors))
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
					<Button variant='contained' onClick={() => agent.ErrorRoutes.badRequest()}>
						Bad Request
					</Button>
					<Button
						variant='contained'
						onClick={() => agent.ErrorRoutes.unauthorized()}
					>
						Unauthorized
					</Button>
					<Button variant='contained' onClick={() => agent.ErrorRoutes.notFound()}>
						Not Found
					</Button>
					<Button
						variant='contained'
						onClick={() => agent.ErrorRoutes.serverError()}
					>
						Server Error
					</Button>
				</ButtonGroup>
				{invalidErrors.length > 0 && <AlertErrors invalidErrors={invalidErrors} />}
			</Container>
		</Layout>
	)
}

export default TestButtons
