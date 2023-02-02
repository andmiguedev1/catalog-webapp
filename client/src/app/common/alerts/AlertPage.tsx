import { Alert, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Layout from '../../layout/Layout'

function AlertPage() {
	return (
		<Layout>
			<Alert
				security='info'
				action={
					<Button color='inherit' size='small' component={Link} to='/products'>
						Go to Catalog
					</Button>
				}
			>
				Your cart is empty. Add new items from the catalog
			</Alert>
		</Layout>
	)
}

export default AlertPage
